"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Phone,
  ScrollText,
  Volume2,
  VolumeX,
} from "lucide-react";
import { invite } from "./invite";

/* ---------- Phong bì mở đầu ---------- */
function Envelope({
  onOpen,
  onDone,
}: {
  onOpen: () => void;
  onDone: () => void;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const start = () => {
    if (open) return;
    setOpen(true);
    onOpen();
    setTimeout(onDone, reduce ? 300 : 2100);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-deep px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center gap-8">
        <div
          className="relative aspect-[4/3] w-[min(86vw,420px)]"
          style={{ perspective: 1000 }}
        >
          <div className="absolute inset-0 rounded-sm bg-[#35050c]" />

          <motion.div
            className="absolute inset-x-[6%] top-[6%] bottom-[6%] z-20 grid place-items-center rounded-sm bg-cream px-4 text-center"
            animate={open ? { y: "-58%" } : { y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.7,
              duration: reduce ? 0 : 1,
              ease: "easeOut",
            }}
          >
            <div>
              <p className="font-display text-xl italic text-wine">
                Lễ tốt nghiệp
              </p>
              <p className="mt-1 font-display text-3xl font-semibold leading-tight text-teal">
                {invite.name}
              </p>
            </div>
          </motion.div>

          <div
            className="absolute inset-0 z-30 bg-wine"
            style={{
              clipPath: "polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-[#97152b]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 62%)",
              transformOrigin: "top",
            }}
            animate={{ rotateX: open ? 180 : 0, zIndex: open ? 10 : 40 }}
            transition={{
              rotateX: { duration: reduce ? 0 : 0.7 },
              zIndex: { delay: reduce ? 0 : 0.3, duration: 0 },
            }}
          />

          <AnimatePresence>
            {!open && (
              <motion.button
                onClick={start}
                aria-label="Mở thiệp"
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute left-1/2 top-[62%] z-50 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gold text-deep shadow-lg transition-transform hover:scale-105"
              >
                <GraduationCap className="size-7" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <p className="text-sm font-light text-cream/80">
          {open ? "Đang mở thiệp..." : "Chạm vào mũ tốt nghiệp để mở thiệp"}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- Trang chính ---------- */
export default function Page() {
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [photoOk, setPhotoOk] = useState(true);
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const play = () => {
    audio.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  };
  const toggleMusic = () => {
    if (!audio.current) return;
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else play();
  };

  return (
    <>
      <AnimatePresence>
        {!done && <Envelope onOpen={play} onDone={() => setDone(true)} />}
      </AnimatePresence>

      {invite.music && (
        <audio ref={audio} src={invite.music} loop preload="auto" />
      )}
      {invite.music && done && (
        <button
          onClick={toggleMusic}
          aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          className="fixed right-4 bottom-4 z-40 grid size-11 cursor-pointer place-items-center rounded-full bg-gold text-deep shadow-lg"
        >
          {playing ? (
            <Volume2 className="size-5" />
          ) : (
            <VolumeX className="size-5" />
          )}
        </button>
      )}

      <main className="min-h-svh sm:py-8">
        <article className="relative mx-auto max-w-[480px] overflow-hidden bg-cream shadow-2xl">
          {/* khung viền vàng */}
          <div className="pointer-events-none absolute inset-3 z-20 border-2 border-gold" />
          <div className="pointer-events-none absolute inset-[18px] z-20 border border-gold/60" />

          {/* trang trí mũ và cuộn bằng */}
          <GraduationCap
            className="absolute top-5 left-5 z-30 size-14 -rotate-12 text-gold drop-shadow"
            strokeWidth={1.5}
          />
          <ScrollText
            className="absolute top-6 right-6 z-30 size-12 rotate-12 text-gold drop-shadow"
            strokeWidth={1.5}
          />
          <GraduationCap
            className="absolute right-6 bottom-6 z-30 size-12 rotate-12 text-wine"
            strokeWidth={1.5}
          />

          {/* phần đỏ trên cùng */}
          <header className="bg-gradient-to-b from-wine to-deep px-8 pt-16 pb-28 text-center">
            <p className="font-display text-2xl font-semibold tracking-[0.2em] text-gold">
              THIỆP MỜI
            </p>
            <h1 className="mt-2 font-display text-[clamp(2.5rem,11vw,3.4rem)] font-semibold leading-tight tracking-wide text-[#f5e6c4]">
              LỄ TỐT NGHIỆP
            </h1>
          </header>

          {/* phần kem: nội dung */}
          <section className="px-8 pt-6 pb-20 text-center">
            <p className="text-[15px] text-teal">
              Trân trọng kính mời đến dự buổi Lễ Tốt Nghiệp của:
            </p>
            <p className="mt-3 font-display text-[3rem] font-semibold uppercase  text-teal">
              {invite.name}
            </p>

            <div className="mx-auto my-8 h-px w-4/5 bg-gold/70" />

            <p className="text-lg font-bold tracking-wide text-wine">
              THỜI GIAN:
            </p>
            <p className="mt-1 text-xl font-bold text-deep">
              {invite.timeLabel} | {invite.weekday.toUpperCase()}
            </p>
            <p className="text-xl font-bold text-deep">
              NGÀY {invite.dateText}
            </p>

            <p className="mt-6 text-lg font-bold tracking-wide text-wine">
              ĐỊA ĐIỂM:
            </p>
            <p className="mt-1 text-xl font-bold uppercase text-deep">
              {invite.hall}
            </p>
            <p className="text-xl font-bold uppercase leading-snug text-deep">
              {invite.school}
            </p>
            <p className="mx-auto mt-2 max-w-xs text-sm text-ink/80">
              ({invite.address})
            </p>

            <a
              href={invite.mapLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-wine px-5 py-2 text-sm font-medium text-wine transition-colors hover:bg-wine hover:text-cream"
            >
              <MapPin className="size-4" /> Chỉ đường
            </a>

            <div className="mx-auto my-8 h-px w-4/5 bg-gold/70" />

            <p className="text-[15px] text-ink">
              Xác nhận tham dự với <b>{invite.name}</b>
              <br />
              qua số điện thoại:
            </p>
            <a
              href={`tel:${invite.phone.replace(/\s/g, "")}`}
              className="mt-2 inline-flex items-center gap-2 text-2xl font-bold text-deep"
            >
              <Phone className="size-5 text-wine" /> {invite.phone}
            </a>
          </section>
        </article>
      </main>
    </>
  );
}
