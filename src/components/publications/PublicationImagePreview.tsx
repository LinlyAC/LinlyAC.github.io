'use client';

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { MagnifyingGlassPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useMessages } from '@/lib/i18n/useMessages';

interface PublicationImagePreviewProps {
    preview: string;
    title: string;
}

export default function PublicationImagePreview({ preview, title }: PublicationImagePreviewProps) {
    const messages = useMessages();
    const [isOpen, setIsOpen] = useState(false);
    const src = `/papers/${preview}`;

    return (
        <>
            <div className="w-full md:w-48 flex-shrink-0">
                <div className="group aspect-video md:aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image
                        src={src}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        aria-label={`${messages.publications.enlargePreview}: ${title}`}
                        aria-haspopup="dialog"
                        aria-expanded={isOpen}
                        title={messages.publications.enlargePreview}
                        className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white shadow-sm opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [@media(hover:none)]:opacity-100 [@media(pointer:coarse)]:opacity-100 motion-reduce:transition-none"
                    >
                        <MagnifyingGlassPlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>

            <Dialog open={isOpen} onClose={setIsOpen} className="relative z-[100]">
                <DialogBackdrop className="fixed inset-0 bg-black/75" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-background shadow-2xl">
                        <div className="flex shrink-0 items-start gap-4 border-b border-neutral-200 p-4 sm:px-6">
                            <DialogTitle className="min-w-0 flex-1 text-sm font-medium leading-relaxed text-primary sm:text-base">
                                {title}
                            </DialogTitle>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setIsOpen(false)}
                                aria-label={messages.publications.closePreview}
                                title={messages.publications.closePreview}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-primary hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                            >
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="relative h-[70dvh] min-h-0 w-full bg-white">
                            <Image
                                src={src}
                                alt={title}
                                fill
                                className="object-contain p-2 sm:p-4"
                                sizes="(max-width: 1280px) 100vw, 1152px"
                                priority
                            />
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
