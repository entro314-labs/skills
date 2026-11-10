import { useState } from "react";
import { toast } from "./toast";
import { Badge, Button, Card, Dialog } from "./ui";
import { deleteProjects, upgradePlan } from "./api";

const MAX_SEATS = 25;

type Props = {
  projects: { id: string; name: string }[];
  selected: string[];
  price: number;
  renewalDay: number;
};

export function Billing({ projects, selected, price, renewalDay }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onUpgrade() {
    setLoading(true);
    try {
      await upgradePlan();
      toast.success("Your plan has been upgraded successfully!");
    } catch (err) {
      toast.error("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    await deleteProjects(selected);
    setConfirming(false);
    toast.success("Projects deleted successfully!");
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <p className="text-xs uppercase tracking-widest text-indigo-500">Your workspace</p>
      <h1 className="text-2xl font-semibold">Billing</h1>
      <p className="text-sm text-gray-500">Manage your billing and subscription settings here.</p>

      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        Live · Synced · v2.4.1 · Updated just now
      </div>

      <Card className="mt-6">
        <span className="font-mono text-sm">01 //</span>
        <h2 className="text-lg font-medium">✨ Upgrade to Pro <Badge>NEW</Badge></h2>
        <p className="text-sm">Unlock the full power of the platform and supercharge your team with our seamless all-in-one plan.</p>
        <p className="text-sm">Trusted by 10,000+ teams worldwide.</p>

        <label htmlFor="seats">Seats</label>
        <input id="seats" type="number" min={1} max={MAX_SEATS} placeholder="Enter the number of seats" />
        <small>Up to {MAX_SEATS} seats. Contact sales for more.</small>

        <Button onClick={onUpgrade} disabled={loading}>
          {loading ? "Hang tight, working our magic..." : "Get started"}
        </Button>
        <small>
          You'll be charged ${price} today, then ${price} on day {renewalDay} of each month.
        </small>
      </Card>

      <Card className="mt-6">
        <h2 className="text-lg font-medium">Projects</h2>
        <p className="text-sm text-gray-500">This card shows all of the projects in your workspace.</p>
        {projects.length === 0 ? (
          <div>
            <h3>Nothing here yet!</h3>
            <p>Looks like you haven't created any projects yet. Get started by creating your first project and it will show up here.</p>
            <Button href="/projects/new">Get started</Button>
          </div>
        ) : (
          <ul>
            {projects.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}
        <Button variant="danger" onClick={() => setConfirming(true)} disabled={selected.length === 0}>
          Delete
        </Button>
      </Card>

      {confirming && (
        <Dialog title="Are you sure?">
          <p>Are you sure you want to delete? This action cannot be undone.</p>
          <Button onClick={() => setConfirming(false)}>Cancel</Button>
          <Button variant="danger" onClick={onDelete}>OK</Button>
        </Dialog>
      )}
    </main>
  );
}
