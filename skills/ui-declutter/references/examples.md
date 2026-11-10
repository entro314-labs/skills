# Before and after

Each example starts with the who-and-doing line, because the same text can be clutter on one screen and necessary on another. Several examples end with text kept or a task raised: those are as much the point as the cuts.

## Contents
- Pause menu (C1, C3, C5)
- Hero, with facts in the source (C1, C8, W2)
- Hero, with no facts in the source (C8, F1)
- Feature card (C2, C3)
- Menu with descriptions (C3)
- Card that explains itself (C4, C5)
- Helper text that stays (C4 kept)
- Form field (C7)
- Button labels (A1)
- Confirmation dialog (A3)
- Toast and error (S2, S4)
- Empty state (S3)
- Status line (C6, D2)
- KPI tile (D3, V3)
- Chart header (V1, V2)
- Chart scaffolding and legend (V4, V5)

## Pause menu (C1, C3, C5)

**Who:** a player mid-mission who pressed Esc. **Doing:** deciding whether to go back in, change a setting or restart.

Before:
```html
<p class="eyebrow">Operation on hold</p>
<h1>Paused</h1>
<p class="hint">Resume recaptures the mouse.</p>
<button>Resume</button>
<button>Settings</button>
<button>Controls</button>
<button>Restart mission</button>
```

After:
```html
<h1>Paused</h1>
<button>Resume</button>   <!-- Click re-requests pointer lock; browsers require a user gesture. -->
<button>Settings</button>
<button>Controls</button>
<button>Restart mission</button>
```

Three lines said "the game is paused". The eyebrow goes (C1). The mouse line is a fact about pointer lock that the developer needs and the player doesn't, so it moves to a comment (C5). If the game's voice is strong elsewhere, the other valid edit is to promote "Operation on hold" to the heading and cut "Paused". Either way, one line. "Restart mission" keeps its object: "Restart" alone could mean the level or the game.

## Hero, with facts in the source (C1, C8, W2)

**Who:** a finance lead who followed a link. **Doing:** working out what this product is.

The repo's `content/product.md` says: "Ledger collects every company card transaction in one place and matches receipts to transactions automatically."

Before:
```html
<p class="text-xs uppercase tracking-widest text-indigo-500">Introducing Ledger</p>
<h1>Finance. Simplified. Finally.</h1>
<p>The all-in-one platform that helps modern teams seamlessly manage their money, without the hassle.</p>
<a href="/signup">Get started</a>
```

After:
```html
<h1>Ledger tracks every company card in one place</h1>
<p>Receipts match to transactions automatically.</p>
<a href="/signup">Create account</a>
```

Both claims in the rewrite come from `content/product.md`. The button says what `/signup` does (A1).

## Hero, with no facts in the source (C8, F1)

Same markup, but the repo has no product description, and the page also carries `<p>Trusted by 10,000+ teams worldwide</p>`.

After:
```html
<h1>Ledger</h1>
<a href="/signup">Create account</a>
```

Report:
```
- [ ] index.html:12  C8 slogan "Finance. Simplified. Finally." removed. Needs one sentence saying what Ledger does.
- [ ] index.html:19  F1 "Trusted by 10,000+ teams worldwide": no source in the repo. Supply the real figure or leave it out.
```

The screen is thinner than before, and that is correct: it now shows that the content is missing, which a confident invented sentence would have hidden. Do not write "Ledger tracks every company card" here. You'd be guessing.

## Feature card (C2, C3)

Before:
```jsx
<span className="font-mono text-sm">01 //</span>
<h3>Smart sync</h3>
<p>Our smart sync feature automatically keeps your files in sync across all of your devices.</p>
```

After:
```jsx
<h3>Sync across devices</h3>
```

The order of features isn't real, so the number goes (C2). The description restated the title in more words (C3). The useful fact from it ("across devices") moves into the heading. Nothing in the source says how fast sync is or which devices, so no new sentence is written.

## Menu with descriptions (C3)

Before:
```
Resume          Continue where you left off.
Settings        Update your settings.
Controls        Your preferred setup.
Restart mission Back to the beginning.
```

After:
```
Resume
Settings
Controls
Restart mission
```

Contrast with a menu where the descriptions pass the test, and stay:

```
Viewer     Can read and comment
Editor     Can edit and share
Owner      Can delete the workspace and manage billing
```

A user choosing a role would make a mistake without those lines.

## Card that explains itself (C4, C5)

Before:
```jsx
<Card>
  <CardTitle>Recent activity</CardTitle>
  <CardDescription>This card shows your most recent activity across the workspace (updates in real time).</CardDescription>
  <ActivityList />
</Card>
```

After:
```jsx
<Card>
  <CardTitle>Recent activity</CardTitle>
  <ActivityList />
</Card>
```

## Helper text that stays (C4 kept)

**Who:** someone upgrading a plan. **Doing:** about to pay.

```jsx
<label htmlFor="pw">Password</label>
<input id="pw" type="password" />
<small>At least 12 characters, with one number.</small>

<button>Upgrade to Pro</button>
<small>You'll be charged $24 today, then $24 on the 10th of each month.</small>
```

No change. The first line is a constraint the user must meet. The second is the consequence of pressing the button. The counter doesn't flag either, and a pattern-minded read of C4 would cut both. Report them under "Kept on purpose" only if something else on the screen was edited.

## Form field (C7)

Before:
```html
<label>Email address</label>
<input placeholder="Enter your email address" />
<small>We'll use this email address to contact you.</small>
```

After:
```html
<label for="email">Email</label>
<input id="email" type="email" />
```

The label stays because it's the accessible name and doesn't vanish on input. If the form is a newsletter signup, the `small` line is a consent-adjacent statement of use: keep it and tighten nothing.

## Button labels (A1)

| Before | Destination or handler | After |
|---|---|---|
| Get started | `/signup` | Create account |
| Learn more | `/pricing` | See pricing |
| Submit | `sendInvite()` | Send invite |
| OK | closes an info dialog | Close |
| Continue | step 2 of 4 | Continue (unchanged) |

Read the handler or the `href` to find the verb. If you can't tell what the button does, don't guess. List it as a task.

## Confirmation dialog (A3)

Before:
```jsx
<Dialog title="Are you sure?">
  <p>Are you sure you want to delete? This action cannot be undone.</p>
  <Button>Cancel</Button><Button variant="danger">OK</Button>
</Dialog>
```

After, where the component has `count` and `taskCount` in scope:
```jsx
<Dialog title={`Delete ${count} projects?`}>
  <p>This also removes their {taskCount} tasks. You can't undo this.</p>
  <Button>Cancel</Button><Button variant="danger">Delete projects</Button>
</Dialog>
```

If only `count` is in scope, the body is "You can't undo this." Don't mention tasks you can't see being deleted.

## Toast and error (S2, S4)

Before:
```js
toast.success("Your changes have been saved successfully!");
toast.error("Oops! Something went wrong. Please try again later.");
```

After, where the catch block exposes `err.status === 413` and a general failure:
```js
toast.success("Saved");
toast.error(err.status === 413 ? "That file is over the 25 MB limit." : "Couldn't save. Try again.");
```

The 25 MB figure is the constant `MAX_UPLOAD_MB` in the same file. If the handler had no status to branch on, the error would be "Couldn't save. Try again." and the report would carry a task: the error handling discards the cause.

## Empty state (S3)

Before:
```jsx
<EmptyIllustration />
<h3>Nothing here yet!</h3>
<p>Looks like you haven't created any invoices yet. Get started by creating your first invoice and it will show up here.</p>
<Button>Get started</Button>
```

After:
```jsx
<p>Invoices you send appear here.</p>
<Button>Create invoice</Button>
```

The sentence stays, shorter. The illustration goes if it was only filling space; if the project uses one in every empty state, leave it.

## Status line (C6, D2)

Before:
```jsx
<div className="flex items-center gap-2 text-xs">
  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
  Live · 3 agents · Synced · v2.4.1 · Updated just now
</div>
```

After, when nothing in the app tracks a live connection:
```jsx
<p className="text-xs">3 agents</p>
```

If the dot is bound to a real connection state, keep it with an `aria-label` and cut the word "Live".

## KPI tile (D3, V3)

Before:
```jsx
<Tile>
  <span>💰 Total revenue</span>
  <strong>$48,200</strong>
  <span className="text-green-600">▲ 12% up</span>
  <p>Revenue grew 12% compared to last month, showing strong momentum.</p>
</Tile>
```

After:
```jsx
<Tile>
  <span>Revenue</span>
  <strong>$48,200</strong>
  <span className="text-green-600">▲ 12% vs last month</span>
</Tile>
```

"vs last month" comes from the removed sentence, so it isn't new.

## Chart header (V1, V2)

Before:
```js
title: { text: 'Line chart of weekly active users' },
subtitle: { text: 'Each point represents one week. Hover over a point to see the exact value.' },
legend: { display: true }, // single series
```

After:
```js
title: { text: 'Weekly active users' },
legend: { display: false },
```

## Chart scaffolding and legend (V4, V5)

Before:
```js
datasets: [{ label: 'This year', data: thisYear }, { label: 'Last year', data: lastYear }],
plugins: { legend: { display: true, position: 'bottom' } },
scales: {
  y: { grid: { color: '#9ca3af', lineWidth: 2 }, border: { display: true, width: 2 }, ticks: { stepSize: 25 } },
},
```

After:
```js
datasets: [{ label: 'This year', data: thisYear }, { label: 'Last year', data: lastYear }],
plugins: {
  legend: { display: false },
  // Name each line at its last point.
  datalabels: { display: (ctx) => ctx.dataIndex === ctx.dataset.data.length - 1, formatter: (v, ctx) => `${ctx.dataset.label} ${v}` },
},
scales: {
  y: { grid: { color: '#eeeeee', lineWidth: 1 }, border: { display: false } },
},
```

Same chart type, data and series colors. If the datalabels plugin isn't already a dependency, don't add it: thin the scaffolding, keep the legend, and list direct labelling as a task.
