'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  GraduationCap,
  HandHeart,
  Handshake,
  Heart,
  Users,
  X,
} from 'lucide-react';
import { DonationForm } from './DonationForm';
import { ContactForm } from './ContactForm';
import type { SupportRequest } from '@/lib/support';

type SupportContextValue = {
  openSupport: (request: SupportRequest, trigger?: HTMLElement) => void;
};
const SupportContext = createContext<SupportContextValue | null>(null);
export function useSupportModal() {
  const context = useContext(SupportContext);
  if (!context)
    throw new Error('Support actions must be inside SupportModalProvider');
  return context;
}
const presentations = {
  donate: {
    title: 'Make a donation',
    description:
      'Help provide training tools, learning materials and practical sessions.',
    icon: Heart,
  },
  sponsor: {
    title: 'Sponsor a trainee',
    description:
      'Support the materials and instruction needed to practise a trade.',
    icon: GraduationCap,
  },
  volunteer: {
    title: 'Volunteer your time',
    description: 'Share a skill, support a literacy session or mentor someone.',
    icon: Users,
  },
  partner: {
    title: 'Partner with us',
    description:
      'Help with equipment, expertise, mentoring or practical opportunities.',
    icon: Handshake,
  },
  enquiry: {
    title: 'Enquire about giving',
    description:
      'Tell us how you would like to support practical learning and livelihoods.',
    icon: HandHeart,
  },
};

export function SupportModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [request, setRequest] = useState<
    (SupportRequest & { id: number }) | null
  >(null);
  const sequence = useRef(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const isOpen = request !== null;
  const openSupport = useCallback(
    (selection: SupportRequest, element?: HTMLElement) => {
      trigger.current =
        element ||
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
      setRequest({ ...selection, id: ++sequence.current });
    },
    [],
  );
  const closeSupport = useCallback(() => {
    setRequest(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has('support')) {
      for (const key of ['support', 'purpose', 'type', 'subject'])
        url.searchParams.delete(key);
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, []);
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    modal?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onPopState = () => closeSupport();
    window.addEventListener('popstate', onPopState);
    return () => {
      modal?.close();
      document.body.style.overflow = overflow;
      window.removeEventListener('popstate', onPopState);
      const origin = trigger.current;
      if (
        origin?.isConnected &&
        origin.getClientRects().length &&
        !origin.closest('[inert]')
      )
        origin.focus({ preventScroll: true });
      else
        document
          .querySelector<HTMLButtonElement>('.menu-toggle')
          ?.focus({ preventScroll: true });
    };
  }, [isOpen, closeSupport]);
  useEffect(() => {
    if (request) {
      dialog.current?.scrollTo({ top: 0 });
      heading.current?.focus({ preventScroll: true });
    }
  }, [request]);
  const presentation = request ? presentations[request.kind] : null;
  const Icon = presentation?.icon || Heart;
  return (
    <SupportContext.Provider value={{ openSupport }}>
      {children}
      <dialog
        ref={dialog}
        className="support-dialog"
        aria-labelledby="support-modal-title"
        aria-describedby="support-modal-description"
        onCancel={(event) => {
          event.preventDefault();
          closeSupport();
        }}
        onClose={(event) => {
          if (!event.currentTarget.open) closeSupport();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              closeSupport();
          }
          // Close when an ordinary same-tab link (e.g. privacy policy) navigates.
          if (
            !event.defaultPrevented &&
            !event.metaKey &&
            !event.ctrlKey &&
            !event.shiftKey &&
            !event.altKey &&
            event.target instanceof Element
          ) {
            const link = event.target.closest('a[href]');
            if (link && link.getAttribute('target') !== '_blank')
              closeSupport();
          }
        }}
      >
        {request && presentation && (
          <>
            <div className="support-dialog-header">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/20 text-navy">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow text-leaf">Get involved</p>
                  <h2
                    ref={heading}
                    tabIndex={-1}
                    id="support-modal-title"
                    className="mt-1 text-xl font-black leading-tight outline-none sm:text-2xl"
                  >
                    {presentation.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={closeSupport}
                className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-navy"
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>
            <div className="support-dialog-body">
              <p
                id="support-modal-description"
                className="mb-6 text-sm leading-7 text-slate-600"
              >
                {presentation.description}
              </p>
              {request.kind === 'donate' || request.kind === 'sponsor' ? (
                <DonationForm
                  onNavigate={closeSupport}
                  key={request.id}
                  initialPurpose={
                    request.kind === 'sponsor'
                      ? 'vocational-training'
                      : request.purpose
                  }
                />
              ) : (
                <ContactForm
                  onNavigate={closeSupport}
                  key={request.id}
                  embedded
                  initialSubject={
                    request.subject ||
                    (request.kind === 'volunteer'
                      ? 'Volunteer'
                      : request.kind === 'partner'
                        ? 'Partnership'
                        : 'Donation')
                  }
                  initialValues={request.values}
                />
              )}
            </div>
          </>
        )}
      </dialog>
    </SupportContext.Provider>
  );
}
