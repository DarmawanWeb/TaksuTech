'use client';

import { Button } from '@taksu/ui/components/button';
import { Input } from '@taksu/ui/components/input';
import { Label } from '@taksu/ui/components/label';
import { Textarea } from '@taksu/ui/components/textarea';
import { Mail, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type FormEvent, useState } from 'react';
import { mailtoUrl, whatsappUrl } from '@/lib/links';

type Channel = 'whatsapp' | 'email';
const interests = ['reception', 'education', 'custom', 'other'] as const;
type Interest = (typeof interests)[number];

const isInterest = (value: string | null): value is Interest =>
  (interests as readonly string[]).includes(value ?? '');

/**
 * Composes the enquiry client-side and hands it to WhatsApp or the mail app,
 * so the site stays fully static with no form backend to secure.
 */
export function ContactForm({ email }: { email: string }) {
  const t = useTranslations('Contact.form');
  const [error, setError] = useState<string | null>(null);
  const hasWhatsapp = whatsappUrl('test') !== null;
  // Links such as /contact?topic=custom open the form with that interest already chosen.
  const topic = useSearchParams().get('topic');
  const initialInterest: Interest = isInterest(topic) ? topic : 'reception';

  const interestLabel: Record<Interest, string> = {
    reception: t('interestOptions.reception'),
    education: t('interestOptions.education'),
    custom: t('interestOptions.custom'),
    other: t('interestOptions.other'),
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = (submitter?.value ?? 'email') as Channel;
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const organization = String(data.get('organization') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const interest = String(data.get('interest') ?? 'other') as Interest;

    if (!name || !message) {
      setError(t('required'));
      return;
    }
    setError(null);

    const text = t('template', {
      name,
      organization: organization || '-',
      interest: interestLabel[interest] ?? interestLabel.other,
      message,
    });

    if (channel === 'whatsapp') {
      const url = whatsappUrl(text);
      if (url) window.open(url, '_blank', 'noopener');
      return;
    }
    window.location.href = mailtoUrl(email, t('subject'), text);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input id="name" name="name" autoComplete="name" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="organization">{t('organization')}</Label>
          <Input id="organization" name="organization" autoComplete="organization" />
        </div>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">{t('interest')}</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <label
              key={interest}
              className="border-border bg-surface has-[:checked]:border-primary has-[:checked]:text-primary flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm"
            >
              <input
                type="radio"
                name="interest"
                value={interest}
                defaultChecked={interest === initialInterest}
                className="accent-primary"
              />
              {interestLabel[interest]}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t('messagePlaceholder')}
          required
          rows={5}
        />
      </div>
      {error ? (
        <p role="alert" className="text-danger text-sm font-semibold">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          name="channel"
          value="whatsapp"
          size="lg"
          disabled={!hasWhatsapp}
          className="w-full px-4 sm:w-auto sm:px-7"
        >
          <MessageCircle aria-hidden />
          {t('sendWhatsapp')}
        </Button>
        <Button
          type="submit"
          name="channel"
          value="email"
          size="lg"
          variant="outline"
          className="w-full px-4 sm:w-auto sm:px-7"
        >
          <Mail aria-hidden />
          {t('sendEmail')}
        </Button>
      </div>
      {!hasWhatsapp ? (
        <p className="text-muted-foreground text-xs">{t('whatsappMissing')}</p>
      ) : null}
    </form>
  );
}
