"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Info, Package, MapPin, Heart, LogOut, User, Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Logo from "@/components/Logo";
import { useStore } from "@/lib/store";
import { getProductById, formatPrice } from "@/lib/products";

interface DemoUser { name: string; email: string }
interface Address { id: number; label: string; lines: string }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const USER_KEY = "sr-demo-user";

const DEMO_ORDERS = [
  { id: "SR-DEMO-104821", date: "Sample order", status: "Delivered", items: ["p01", "p11"] },
  { id: "SR-DEMO-098337", date: "Sample order", status: "In transit", items: ["p06", "p07", "p13"] },
];

function AuthForm({ mode, setMode, onAuth }: { mode: "signin" | "register"; setMode: (m: "signin" | "register") => void; onAuth: (u: DemoUser) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (mode === "register" && !name.trim()) er.name = "Please enter your name.";
    if (!email.trim()) er.email = "Email is required.";
    else if (!EMAIL_RE.test(email.trim())) er.email = "Enter a valid email address.";
    if (!password) er.password = "Password is required.";
    else if (password.length < 6) er.password = "Use at least 6 characters.";
    setErrors(er);
    if (Object.keys(er).length) return;
    onAuth({ name: mode === "register" ? name.trim() : email.split("@")[0], email: email.trim() });
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
      <div className="bg-white p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)] md:p-10">
        <div className="mb-8 flex border-b border-black/10">
          {(["signin", "register"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setErrors({}); }} className={`-mb-px flex-1 border-b-2 pb-3 font-display text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${mode === m ? "border-gold text-jet" : "border-transparent text-stone hover:text-jet"}`}>
              {m === "signin" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>
        <form onSubmit={submit} noValidate className="space-y-5">
          {mode === "register" && (
            <div>
              <label className="label" htmlFor="name">Full name</label>
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
          )}
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>
          <button className="btn-primary w-full">{mode === "signin" ? "Sign In" : "Create Account"}</button>
          <p className="flex gap-2 text-[11px] leading-relaxed text-stone"><Info className="h-3.5 w-3.5 shrink-0 text-gold-deep" />Simulated account — nothing is sent to a server and your password is never stored. Only a demo name and email are kept in this browser.</p>
        </form>
      </div>
      <div className="flex flex-col justify-center">
        <Logo variant="stacked" size={56} />
        <h2 className="mt-10 font-display text-3xl font-bold uppercase leading-[0.95] tracking-tight md:text-4xl">Your Solid Racks account</h2>
        <ul className="mt-6 space-y-3 text-sm text-black/70">
          {["Track orders and view order history", "Save shipping addresses for faster checkout", "Keep your wishlist in one place", "Early access to the next drop"].map((t) => (
            <li key={t} className="flex items-center gap-3"><span className="h-1 w-4 bg-gold" />{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AccountPage() {
  const { wishlist, showToast } = useStore();
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [tab, setTab] = useState<"overview" | "orders" | "addresses">("overview");
  const [addresses, setAddresses] = useState<Address[]>([{ id: 1, label: "Home (sample)", lines: "123 Sample Street, Apt 4\nYour City, ST 00000\nUnited States" }]);
  const [adding, setAdding] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "", lines: "" });
  const [addrErr, setAddrErr] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setUser(JSON.parse(raw));
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  const auth = (u: DemoUser) => {
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    showToast({ title: mode === "register" ? "Demo account created" : "Signed in (demo)", message: `Welcome, ${u.name}` });
  };
  const signOut = () => { setUser(null); localStorage.removeItem(USER_KEY); showToast({ title: "Signed out (demo)" }); };

  const saveAddr = () => {
    if (!newAddr.label.trim() || newAddr.lines.trim().length < 8) return setAddrErr("Add a label and a full address.");
    setAddresses((a) => [...a, { id: Date.now(), label: newAddr.label.trim(), lines: newAddr.lines.trim() }]);
    setNewAddr({ label: "", lines: "" });
    setAddrErr("");
    setAdding(false);
  };

  return (
    <>
      <PageHeader eyebrow="Account" title={user ? <>Welcome, <span className="font-script text-6xl font-normal normal-case tracking-normal text-gold-deep md:text-8xl">{user.name}</span></> : "Sign in"}>
        <span className="inline-flex items-center gap-2"><Info className="h-4 w-4 text-gold-deep" />Account demonstration — frontend only, no real authentication.</span>
      </PageHeader>
      <div className="bg-soft px-5 py-14 md:px-8 md:py-20">
        {!ready ? <div className="h-64" /> : !user ? (
          <AuthForm mode={mode} setMode={setMode} onAuth={auth} />
        ) : (
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_1fr]">
            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {([["overview", "Overview", User], ["orders", "Order History", Package], ["addresses", "Addresses", MapPin]] as const).map(([k, l, I]) => (
                <button key={k} onClick={() => setTab(k)} className={`flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${tab === k ? "bg-jet text-white" : "bg-white hover:bg-white/60"}`}>
                  <I className={`h-4 w-4 ${tab === k ? "text-gold" : ""}`} strokeWidth={1.5} />{l}
                </button>
              ))}
              <Link href="/wishlist" className="flex shrink-0 items-center gap-3 bg-white px-4 py-3 text-sm hover:bg-white/60"><Heart className="h-4 w-4" strokeWidth={1.5} />Wishlist ({wishlist.length})</Link>
              <button onClick={signOut} className="flex shrink-0 items-center gap-3 px-4 py-3 text-sm text-stone hover:text-jet"><LogOut className="h-4 w-4" strokeWidth={1.5} />Sign out</button>
            </nav>

            <div className="bg-white p-6 md:p-10">
              {tab === "overview" && (
                <div className="anim-fade-in">
                  <p className="eyebrow text-gold-deep">Overview</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">Account details</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[["Name", user.name], ["Email", user.email], ["Member", "Demo profile"]].map(([l, v]) => (
                      <div key={l} className="border border-black/10 p-4"><p className="label">{l}</p><p className="break-words text-sm">{v}</p></div>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <button onClick={() => setTab("orders")} className="group bg-jet p-6 text-left text-white"><Package className="h-5 w-5 text-gold" /><p className="mt-6 font-display text-3xl font-bold">{DEMO_ORDERS.length}</p><p className="text-xs uppercase tracking-widest text-white/60 group-hover:text-gold-warm">Sample orders →</p></button>
                    <Link href="/wishlist" className="group border border-black/10 p-6"><Heart className="h-5 w-5 text-gold-deep" /><p className="mt-6 font-display text-3xl font-bold">{wishlist.length}</p><p className="text-xs uppercase tracking-widest text-stone group-hover:text-jet">Wishlist items →</p></Link>
                    <button onClick={() => setTab("addresses")} className="group border border-black/10 p-6 text-left"><MapPin className="h-5 w-5 text-gold-deep" /><p className="mt-6 font-display text-3xl font-bold">{addresses.length}</p><p className="text-xs uppercase tracking-widest text-stone group-hover:text-jet">Saved addresses →</p></button>
                  </div>
                </div>
              )}
              {tab === "orders" && (
                <div className="anim-fade-in">
                  <p className="eyebrow text-gold-deep">Order history</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">Sample orders</h2>
                  <p className="mt-1 text-xs text-stone">Illustrative order history for demonstration.</p>
                  <div className="mt-6 space-y-4">
                    {DEMO_ORDERS.map((o) => {
                      const items = o.items.map(getProductById).filter(Boolean);
                      const total = items.reduce((s, p) => s + (p?.price ?? 0), 0);
                      return (
                        <div key={o.id} className="border border-black/10 p-5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div><p className="font-display text-sm font-bold">{o.id}</p><p className="text-xs text-stone">{o.date}</p></div>
                            <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${o.status === "Delivered" ? "bg-soft" : "bg-jet text-gold-warm"}`}>{o.status}</span>
                          </div>
                          <div className="mt-4 flex items-center gap-3">
                            {items.map((p) => p && (
                              <Link key={p.id} href={`/products/${p.slug}`} className="h-20 w-16 overflow-hidden bg-soft">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                              </Link>
                            ))}
                            <p className="ml-auto font-display text-sm font-semibold">{formatPrice(total)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {tab === "addresses" && (
                <div className="anim-fade-in">
                  <p className="eyebrow text-gold-deep">Addresses</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">Saved addresses</h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {addresses.map((a) => (
                      <div key={a.id} className="relative border border-black/10 p-5">
                        <p className="font-display text-sm font-bold">{a.label}</p>
                        <p className="mt-2 whitespace-pre-line text-sm text-black/70">{a.lines}</p>
                        <button aria-label="Remove address" onClick={() => setAddresses((x) => x.filter((y) => y.id !== a.id))} className="absolute right-3 top-3 p-1.5 text-stone hover:text-jet"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                    {adding ? (
                      <div className="border border-jet p-5 sm:col-span-2">
                        <label className="label" htmlFor="alabel">Label</label>
                        <input id="alabel" className="input" placeholder="e.g. Work" value={newAddr.label} onChange={(e) => setNewAddr((n) => ({ ...n, label: e.target.value }))} />
                        <label className="label mt-4" htmlFor="alines">Address</label>
                        <textarea id="alines" rows={3} className="input" value={newAddr.lines} onChange={(e) => setNewAddr((n) => ({ ...n, lines: e.target.value }))} />
                        {addrErr && <p className="field-error">{addrErr}</p>}
                        <div className="mt-4 flex gap-3"><button onClick={saveAddr} className="btn-primary !py-3">Save</button><button onClick={() => { setAdding(false); setAddrErr(""); }} className="btn-outline !py-3">Cancel</button></div>
                      </div>
                    ) : (
                      <button onClick={() => setAdding(true)} className="flex min-h-36 flex-col items-center justify-center gap-2 border border-dashed border-black/20 text-sm text-stone hover:border-gold hover:text-jet"><Plus className="h-5 w-5" />Add address</button>
                    )}
                  </div>
                  <p className="mt-4 text-[11px] text-stone">Addresses are kept in page memory for this demo only.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
