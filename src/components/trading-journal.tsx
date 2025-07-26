'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2 } from 'lucide-react';

type Note = {
    id: number;
    content: string;
};
type Notes = Record<string, Note[]>;

export function TradingJournal({ lang }: { lang: 'en' | 'ko' }) {
    const [notes, setNotes] = useState<Notes>({});
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [currentNote, setCurrentNote] = useState('');
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
    const { toast } = useToast();

    const selectedDateString = date ? format(date, 'yyyy-MM-dd') : '';

    useEffect(() => {
        try {
            const savedNotes = localStorage.getItem('tradingNotes');
            if (savedNotes) {
                setNotes(JSON.parse(savedNotes));
            }
        } catch (error) { console.error("Failed to load notes from local storage", error); }
    }, []);

    useEffect(() => {
        setCurrentNote('');
        setSelectedNoteId(null);
    }, [date]);

    const saveNotesToLocalStorage = (notesToSave: Notes) => {
        try {
            localStorage.setItem('tradingNotes', JSON.stringify(notesToSave));
        } catch (error) {
            console.error("Failed to save notes to local storage", error);
            toast({ variant: "destructive", title: lang === 'ko' ? '저장 실패' : 'Save Failed' });
        }
    };

    const handleSaveNote = () => {
        if (!date || !currentNote.trim()) return;
        const newNotes = { ...notes };
        const notesForDate = newNotes[selectedDateString] || [];

        if (selectedNoteId) {
            const noteIndex = notesForDate.findIndex(n => n.id === selectedNoteId);
            if (noteIndex > -1) notesForDate[noteIndex].content = currentNote;
        } else {
            notesForDate.push({ id: Date.now(), content: currentNote });
        }

        newNotes[selectedDateString] = notesForDate;
        setNotes(newNotes);
        saveNotesToLocalStorage(newNotes);
        setCurrentNote('');
        setSelectedNoteId(null);
        toast({ title: lang === 'ko' ? '저장 완료' : 'Note Saved' });
    };

    const handleDeleteNote = (noteId: number) => {
        if (!date) return;
        const newNotes = { ...notes };
        let notesForDate = newNotes[selectedDateString] || [];
        notesForDate = notesForDate.filter(note => note.id !== noteId);

        if (notesForDate.length > 0) newNotes[selectedDateString] = notesForDate;
        else delete newNotes[selectedDateString];
        
        setNotes(newNotes);
        saveNotesToLocalStorage(newNotes);
        if (selectedNoteId === noteId) {
            setCurrentNote('');
            setSelectedNoteId(null);
        }
        toast({ title: lang === 'ko' ? '삭제 완료' : 'Note Deleted' });
    };

    const handleSelectNote = (note: Note) => {
        setSelectedNoteId(note.id);
        setCurrentNote(note.content);
    };

    const handleNewNote = () => {
        setCurrentNote('');
        setSelectedNoteId(null);
    }

    const savedDates = Object.keys(notes).filter(d => notes[d].length > 0).map(d => parseISO(d));
    const notesForSelectedDate = notes[selectedDateString] || [];

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>{lang === 'ko' ? '투자 노트' : 'Trading Journal'}</CardTitle>
                <CardDescription>{lang === 'ko' ? '날짜별로 여러 노트를 기록하고 관리하세요.' : 'Manage multiple notes for each date.'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                {/* Left Column: Calendar & Note List */}
                <div className="flex flex-col space-y-3 overflow-hidden">
                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            modifiers={{ saved: savedDates }}
                            modifiersStyles={{ saved: { border: '2px solid hsl(var(--primary))' } }}
                        />
                    </div>
                    <p className="text-sm font-medium pt-2">{lang === 'ko' ? `${selectedDateString} 노트 목록` : `Notes for ${selectedDateString}`}</p>
                    <ScrollArea className="flex-1 rounded-md border p-2">
                         {notesForSelectedDate.length > 0 ? (
                            notesForSelectedDate.map(note => (
                                <div key={note.id} className={`flex items-center justify-between p-2 rounded-md mb-2 cursor-pointer ${selectedNoteId === note.id ? 'bg-primary/10' : 'hover:bg-accent'}`} onClick={() => handleSelectNote(note)}>
                                    <p className="truncate text-sm pr-2">{note.content}</p>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}>
                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground py-8">{lang === 'ko' ? '저장된 노트가 없습니다.' : 'No saved notes.'}</div>
                        )}
                    </ScrollArea>
                </div>
                
                {/* Right Column: Editor */}
                <div className="flex flex-col space-y-3">
                    <Textarea
                        placeholder={lang === 'ko' ? '새 노트를 작성하거나 목록에서 선택하여 편집...' : 'Write a new note or select one to edit...'}
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        className="flex-1 resize-none"
                    />
                    <div className="flex gap-2">
                        <Button onClick={handleSaveNote} className="w-full">
                            {selectedNoteId ? (lang === 'ko' ? '수정' : 'Update') : (lang === 'ko' ? '저장' : 'Save')}
                        </Button>
                        <Button onClick={handleNewNote} variant="outline" size="icon"><Plus className="h-4 w-4"/></Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 