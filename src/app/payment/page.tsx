"use client";

import { useState } from "react";

interface Method {
  name: string;
  logo: string;
  qr?: string;
  number?: string;
  type?: string;
}

const METHODS: Method[] = [
  { name: "bKash", logo: "/images/bkash-logo-free-vector.jpg", qr: "/images/bKash.png", number: "01572902196", type: "MASUDUL" },
  { name: "bKash Link", logo: "/images/Bkash-logo.png", number: "01572902196", type: "Merchant" },
  { name: "Nagad", logo: "/images/Nagad.png", qr: "/images/Nagad-qr.png", number: "01572902196", type: "Merchant" },
  { name: "Rocket", logo: "/images/rocket.png", qr: "/images/Rocket-QR.jpg", number: "01572902196", type: "Merchant" },
  { name: "Upay", logo: "/images/upay.jpg", qr: "/images/Upay-qr.png", number: "01572902196", type: "Merchant" },
  { name: "Bangla QR", logo: "/images/bangla-logo.png", qr: "/images/bangla-scan-qr.png", number: "01572902196", type: "Merchant" },
  { name: "Tap", logo: "/images/MH.png" },
];

const PURPOSES = [
  "Donation",
  "Product Purchase",
  "Service Payment",
  "Event Registration",
  "Club Membership",
  "Other",
];

export default function PaymentPage() {
  const [tab, setTab] = useState<"mobile" | "cards">("mobile");
  const [amount, setAmount] = useState("500");
  const [purpose, setPurpose] = useState("Donation");
  const [selected, setSelected] = useState<Method | null>(null);
  const [processing, setProcessing] = useState(false);

  const total = parseFloat(amount || "0").toFixed(2);

  const selectMethod = (m: Method) => {
    setSelected(m);
  };

  const closeArea = () => setSelected(null);

  const processPayment = async () => {
    if (!selected) return;
    setProcessing(true);

    await new Promise((r) => setTimeout(r, 900)); // simulate processing like the original

    const randomId = "TXN-" + Math.floor(Math.random() * 9000000000 + 1000000000);
    const now = new Date();
    const dateStr = now.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Populate the hidden invoice template
    const tmpl = document.getElementById("payment-report");
    if (!tmpl) {
      setProcessing(false);
      return;
    }
    const q = (id: string) => tmpl.querySelector(`#${id}`) as HTMLElement | null;
    q("report-date")!.innerText = dateStr;
    q("report-trx-id")!.innerText = randomId;
    q("report-trx-id-table")!.innerText = randomId;
    q("report-ref")!.innerText = purpose;
    q("report-desc")!.innerText = purpose;
    q("report-method")!.innerText = selected.name;
    q("report-amount")!.innerText = total;
    q("report-subtotal")!.innerText = total;
    q("report-total")!.innerText = total;

    tmpl.style.cssText = [
      "display:block",
      "position:absolute",
      "top:-29700px",
      "left:0",
      "width:794px",
      "min-height:1123px",
      "padding:40px",
      "box-sizing:border-box",
      "background:white",
      "color:black",
      "font-family:Inter,Arial,sans-serif",
      "z-index:-1",
    ].join(";");

    const html2pdf = (await import("html2pdf.js")).default as unknown as (opt: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set: (o: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        from: (el: any) => {
          save: () => Promise<void>;
        };
      };
    };
    const opt = {
      margin: 0,
      filename: `Invoice_${randomId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      },
      jsPDF: { unit: "px", format: [794, 1123], orientation: "portrait" },
    };

    try {
      await html2pdf(opt).set(opt).from(tmpl).save();
      tmpl.style.cssText = "display:none";
    } catch (e) {
      console.error("PDF generation failed:", e);
      tmpl.style.cssText = "display:none";
      alert("PDF generation failed. Please try again.");
    }
    setProcessing(false);
  };

  const copyBtn = () => {
    if (selected?.number) navigator.clipboard.writeText(selected.number);
  };

  const methodCard = (m: Method) => (
    <button
      key={m.name}
      onClick={() => selectMethod(m)}
      className={`method-card cursor-pointer group p-4 rounded-xl border transition-all flex flex-col items-center gap-3 relative overflow-hidden ${
        selected?.name === m.name
          ? "border-primary bg-primary/5"
          : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5"
      }`}
    >
      <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.logo} className="w-full h-full object-contain rounded" alt={m.name} />
      </div>
      <span className="text-xs font-bold text-gray-400 group-hover:text-white">{m.name}</span>
      <div
        className={`absolute inset-0 border-2 border-primary rounded-xl transition-opacity pointer-events-none ${
          selected?.name === m.name ? "opacity-100" : "opacity-0"
        }`}
      ></div>
    </button>
  );

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
        Payment Portal
      </h1>
      <p className="text-gray-400 text-center mb-10">
        Pay via your preferred method and download a PDF receipt.
      </p>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left — amount & purpose */}
        <div className="lg:col-span-2 rounded-xl bg-glass-bg border border-glass-border p-8">
          <h2 className="font-semibold text-white mb-6 text-lg">Payment Details</h2>
          <label className="text-xs font-bold text-gray-400 uppercase">Purpose</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="mt-2 mb-6 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary text-sm"
          >
            {PURPOSES.map((p) => (
              <option key={p} value={p} className="bg-bg">
                {p}
              </option>
            ))}
          </select>

          <label className="text-xs font-bold text-gray-400 uppercase">Amount (BDT)</label>
          <input
            type="number"
            value={amount}
            min={10}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-white focus:outline-none focus:border-primary text-sm"
          />

          <div className="mt-6 border-t border-white/10 pt-6 flex items-center justify-between">
            <span className="text-gray-400 text-sm">Total</span>
            <span className="text-3xl font-bold text-primary font-mono drop-shadow-lg">
              {total} BDT
            </span>
          </div>
        </div>

        {/* Right payment methods */}
        <div className="lg:col-span-3 rounded-xl bg-glass-bg border border-white/10 flex flex-col min-h-[420px] relative overflow-hidden">
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setTab("mobile")}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                tab === "mobile"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Mobile Banking
            </button>
            <button
              onClick={() => {
                setTab("cards");
                setSelected(null);
              }}
              className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-all ${
                tab === "cards"
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Cards
            </button>
          </div>

          <div className="p-8 flex-1 relative">
            {tab === "mobile" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {METHODS.map(methodCard)}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="far fa-credit-card text-3xl text-gray-500"></i>
                  </div>
                  <p className="text-gray-400">Card payments are coming soon.</p>
                </div>
              </div>
            )}

            {/* Action area overlay */}
            {selected && (
              <div className="absolute bottom-6 left-6 right-6 top-6 bg-black/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center z-20">
                <button onClick={closeArea} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                  <i className="fas fa-times text-xl"></i>
                </button>

                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  Pay via <span className="text-primary">{selected.name}</span>
                </h3>

                {selected.qr && (
                  <div className="bg-white p-3 rounded-xl mb-4 shadow-neon-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selected.qr} alt="QR" className="w-40 h-40 object-contain" />
                  </div>
                )}

                <div className="text-center mb-6 space-y-1">
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Merchant Payment</p>
                  <div className="flex items-center gap-2 justify-center bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                    <i className="fas fa-mobile-alt text-gray-400"></i>
                    <span className="text-xl font-mono font-bold text-white tracking-wider">
                      {selected.number || "N/A"}
                    </span>
                    <button
                      onClick={copyBtn}
                      className="text-primary hover:text-white ml-2 text-xs"
                      aria-label="Copy number"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">{selected.type || "MASUDUL Account"}</p>
                </div>

                {selected.name === "bKash Link" && (
                  <div className="mb-6 w-full flex justify-center">
                    <a
                      href="https://shop.bkash.com/masudul01572902196/paymentlink/default-payment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-48 hover:scale-105 transition-transform"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/Bkash-logo.png" alt="Pay with bKash" className="w-full h-auto rounded shadow-lg border border-white/10" />
                    </a>
                  </div>
                )}

                <button
                  onClick={processPayment}
                  disabled={processing}
                  className="w-full max-w-sm py-3 bg-primary text-black font-bold text-lg rounded-xl hover:bg-white hover:scale-[1.02] transition-all shadow-neon flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {processing ? (
                    <><i className="fas fa-circle-notch fa-spin"></i> Processing...</>
                  ) : (
                    <><span>I Have Paid</span><i className="fas fa-check-circle"></i></>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HIDDEN PDF INVOICE TEMPLATE */}
      <div id="payment-report" style={{ display: "none" }}>
        <div style={{ background: "linear-gradient(135deg,#0a0a1a 0%,#0f2044 60%,#00b4cc 100%)", padding: "30px 40px", margin: "-40px -40px 30px -40px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ verticalAlign: "middle" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "14px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/MH.png" alt="Logo" style={{ width: "52px", height: "52px", objectFit: "contain", borderRadius: "8px", background: "rgba(255,255,255,0.1)", padding: "4px" }} />
                  <div>
                    <p style={{ fontSize: "20px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.05em" }}>MASUDUL HASAN</p>
                    <p style={{ fontSize: "10px", color: "#00f2ff", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.12em" }}>Computer Science &amp; Engineering · SSTU</p>
                  </div>
                </div>
              </td>
              <td style={{ textAlign: "right", verticalAlign: "middle" }}>
                <p style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.08em" }}>INVOICE</p>
                <p style={{ fontSize: "10px", color: "#00f2ff", margin: "6px 0 0", fontFamily: "monospace" }} id="report-trx-id">TXN-XXXXXXXXX</p>
                <span style={{ display: "inline-block", marginTop: "6px", background: "#00f2ff", color: "#000", fontSize: "9px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.1em" }}>PAID</span>
              </td>
            </tr>
          </table>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "28px" }}>
          <tr>
            <td style={{ width: "48%", verticalAlign: "top", paddingRight: "20px" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Received By</p>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 3px" }}>MD. Masudul Hasan</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 2px" }}>📱 01572-902196</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "0 0 2px" }}>🌐 masudul2002.github.io</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "0" }}>🎓 SSTU, Bangladesh</p>
            </td>
            <td style={{ width: "4%" }}></td>
            <td style={{ width: "48%", verticalAlign: "top" }}>
              <p style={{ fontSize: "9px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>Invoice Details</p>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tr><td style={{ fontSize: "11px", color: "#6b7280", padding: "2px 0" }}>Date &amp; Time:</td><td style={{ fontSize: "11px", color: "#111827", fontWeight: 600, padding: "2px 0", textAlign: "right" }} id="report-date"></td></tr>
                <tr><td style={{ fontSize: "11px", color: "#6b7280", padding: "2px 0" }}>Method:</td><td style={{ fontSize: "11px", color: "#111827", fontWeight: 600, padding: "2px 0", textAlign: "right" }} id="report-method">—</td></tr>
                <tr><td style={{ fontSize: "11px", color: "#6b7280", padding: "2px 0" }}>Reference:</td><td style={{ fontSize: "11px", color: "#111827", fontWeight: 600, padding: "2px 0", textAlign: "right" }} id="report-ref"></td></tr>
              </table>
            </td>
          </tr>
        </table>

        <div style={{ height: "1px", background: "#e5e7eb", marginBottom: "24px" }}></div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "28px", border: "1px solid #e5e7eb" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ padding: "11px 14px", fontSize: "9px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Description</th>
              <th style={{ padding: "11px 14px", fontSize: "9px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>Transaction ID</th>
              <th style={{ padding: "11px 14px", fontSize: "9px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>Amount (BDT)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "14px", fontSize: "12px", color: "#1f2937", borderBottom: "1px solid #f3f4f6" }} id="report-desc">Payment</td>
              <td style={{ padding: "14px", fontSize: "11px", color: "#6b7280", fontFamily: "'Courier New',monospace", borderBottom: "1px solid #f3f4f6" }} id="report-trx-id-table">—</td>
              <td style={{ padding: "14px", fontSize: "13px", fontWeight: 700, color: "#1f2937", textAlign: "right", borderBottom: "1px solid #f3f4f6" }} id="report-amount">0.00</td>
            </tr>
          </tbody>
        </table>

        <table style={{ width: "100%", marginBottom: "40px" }}>
          <tr>
            <td style={{ width: "55%" }}></td>
            <td style={{ width: "45%" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#f8fafc", border: "1px solid #e5e7eb" }}>
                <tr><td style={{ padding: "11px 14px", fontSize: "12px", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Subtotal</td><td style={{ padding: "11px 14px", fontSize: "12px", fontWeight: 600, color: "#1f2937", textAlign: "right", borderBottom: "1px solid #e5e7eb" }} id="report-subtotal">0.00</td></tr>
                <tr><td style={{ padding: "11px 14px", fontSize: "12px", color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>Convenience Charge</td><td style={{ padding: "11px 14px", fontSize: "12px", fontWeight: 600, color: "#1f2937", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>0.00</td></tr>
                <tr style={{ background: "#0f172a" }}>
                  <td style={{ padding: "12px 14px", fontSize: "13px", fontWeight: 700, color: "#fff" }}>Total Paid (BDT)</td>
                  <td style={{ padding: "12px 14px", fontSize: "16px", fontWeight: 900, color: "#00f2ff", textAlign: "right" }} id="report-total">0.00</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <div style={{ textAlign: "right", paddingRight: "20px", marginBottom: "40px" }}>
          <p style={{ fontFamily: "'Great Vibes',cursive", fontSize: "30px", color: "#374151", margin: 0 }}>Masudul Hasan</p>
          <div style={{ width: "160px", height: "1px", background: "#d1d5db", margin: "4px 0 4px auto" }}></div>
          <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0 }}>Authorized Signature</p>
        </div>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "16px", textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#9ca3af", margin: "0 0 4px" }}>This is a software-generated invoice. No physical signature required.</p>
          <p style={{ fontSize: "9px", color: "#d1d5db", margin: 0 }}>masudul2002.github.io · 01572-902196 · SSTU, Bangladesh</p>
        </div>
      </div>
    </div>
  );
}