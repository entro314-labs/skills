import { Button, Field, Switch } from "./ui";

type Props = {
  email: string;
  digest: boolean;
  onDigest: (on: boolean) => void;
  onSave: () => void;
  onDeleteAccount: () => void;
};

export function Settings({ email, digest, onDigest, onSave, onDeleteAccount }: Props) {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">Account</h1>

      <Field label="Email" htmlFor="email">
        <input id="email" type="email" defaultValue={email} />
      </Field>

      <Field label="New password" htmlFor="password">
        <input id="password" type="password" autoComplete="new-password" />
        <small>At least 12 characters, with one number.</small>
      </Field>

      <Switch checked={digest} onChange={onDigest} label="Weekly digest email" />

      <Button onClick={onSave}>Save changes</Button>

      <h2 className="mt-8 text-lg font-medium">Delete account</h2>
      <p className="text-sm">
        Deleting your account removes your projects and cancels your subscription. You can't undo this.
      </p>
      <Button variant="danger" onClick={onDeleteAccount}>Delete account</Button>
    </main>
  );
}
