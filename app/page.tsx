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
import { getGuestOptions } from "./guests";

/* ---------- Bước nhập tên người mở thiệp ---------- */
function NameGate({ onSubmit }: { onSubmit: (name: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [choices, setChoices] = useState<string[] | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = value.trim();
    if (!name) {
      setError("Bạn hãy nhập tên của mình nhé.");
      return;
    }

    const options = getGuestOptions(name);

    // Trùng tên (vd: 2 bạn tên Linh) -> cho khách chọn mình là ai
    if (options.length > 1) {
      setChoices(options);
      return;
    }

    onSubmit(options[0]);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-[#071b2e] px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {choices ? (
        <div className="flex w-full max-w-sm flex-col items-center gap-5 text-center">
          <GraduationCap className="size-12 text-gold" strokeWidth={1.5} />

          <h1 className="font-display text-3xl font-semibold text-white">
            Bạn là ai nhỉ?
          </h1>

          <p className="text-sm font-light text-white/70">
            Có nhiều bạn trùng tên, hãy chọn đúng bạn nhé.
          </p>

          <div className="flex w-full flex-col gap-3">
            {choices.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onSubmit(c)}
                className="cursor-pointer rounded-full border border-gold px-6 py-3 text-lg font-semibold text-gold transition-colors hover:bg-gold hover:text-[#071b2e]"
              >
                {c}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setChoices(null)}
            className="cursor-pointer text-sm text-white/60 underline underline-offset-4 hover:text-white"
          >
            Nhập lại tên
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="flex w-full max-w-sm flex-col items-center gap-5 text-center"
        >
          <GraduationCap className="size-12 text-gold" strokeWidth={1.5} />

          <h1 className="font-display text-3xl font-semibold text-white">
            Bạn tên là gì?
          </h1>

          <input
            autoFocus
            value={value}
            maxLength={20}
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            placeholder="Nhập tên của bạn"
            aria-label="Tên của bạn"
            aria-invalid={!!error}
            className="w-full rounded-full border border-gold/70 bg-white/5 px-5 py-3 text-center text-lg text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
          />

          {/* Chú thích */}
          <p className="text-sm font-light leading-relaxed text-white/70">
            Chỉ cần nhập <b className="font-semibold text-white/90">tên</b>,
            không cần họ.
            <br />
            Tên bắt đầu bằng{" "}
            <b className="font-semibold text-white/90">chữ cái in hoa</b>. Ví
            dụ: <i>Khánh</i>.
          </p>

          {error && (
            <p role="alert" className="text-sm text-[#ffb4a8]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="cursor-pointer rounded-full bg-gold px-8 py-3 font-semibold text-[#071b2e] shadow-lg transition-transform hover:scale-105"
          >
            Tiếp tục
          </button>
        </form>
      )}
    </motion.div>
  );
}

/* ---------- Phong bì mở đầu ---------- */
function Envelope({
  guest,
  onOpen,
  onDone,
}: {
  guest: string;
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
      className="fixed inset-0 z-50 grid place-items-center bg-[#071b2e] px-4"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center gap-8">
        <div
          className="relative aspect-[4/3] w-[min(86vw,420px)]"
          style={{ perspective: 1000 }}
        >
          {/* Mặt sau phong bì */}
          <div className="absolute inset-0 rounded-sm bg-[#08233d]" />

          {/* Tờ giấy bên trong */}
          <motion.div
            className="absolute inset-x-[6%] top-[6%] bottom-[6%] z-20 grid place-items-center rounded-sm bg-gradient-to-b from-[#eaf7ff] to-[#ccecff] px-4 text-center"
            animate={open ? { y: "-58%" } : { y: 0 }}
            transition={{
              delay: reduce ? 0 : 0.7,
              duration: reduce ? 0 : 1,
              ease: "easeOut",
            }}
          >
            <div>
              <p className="font-display text-xl italic text-[#164e78]">
                Lễ tốt nghiệp
              </p>

              <p className="mt-1 font-display text-3xl font-semibold leading-tight text-[#0b2a4a]">
                {invite.name}
              </p>
            </div>
          </motion.div>

          {/* Phần trước phong bì */}
          <div
            className="absolute inset-0 z-30 bg-[#164e78]"
            style={{
              clipPath: "polygon(0 0, 50% 62%, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* Nắp phong bì */}
          <motion.div
            className="absolute inset-0 bg-[#246b98]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 62%)",
              transformOrigin: "top",
            }}
            animate={{
              rotateX: open ? 180 : 0,
              zIndex: open ? 10 : 40,
            }}
            transition={{
              rotateX: {
                duration: reduce ? 0 : 0.7,
              },
              zIndex: {
                delay: reduce ? 0 : 0.3,
                duration: 0,
              },
            }}
          />

          {/* Nút mở thiệp */}
          <AnimatePresence>
            {!open && (
              <motion.button
                onClick={start}
                aria-label="Mở thiệp"
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute left-1/2 top-[62%] z-50 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gold text-[#071b2e] shadow-lg transition-transform hover:scale-105"
              >
                <GraduationCap className="size-7" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-sm font-light text-white/80">
          {open ? (
            "Đang mở thiệp..."
          ) : (
            <>
              <b className="font-semibold text-gold">{guest}</b> ơi, chạm vào mũ
              tốt nghiệp để mở thiệp
            </>
          )}
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- Trang chính ---------- */
export default function Page() {
  const [guest, setGuest] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [playing, setPlaying] = useState(false);

  const audio = useRef<HTMLAudioElement>(null);

  // Khoá cuộn trang cho tới khi mở xong thiệp
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
    } else {
      play();
    }
  };

  return (
    <>
      {/* ---------- Nhập tên ---------- */}
      <AnimatePresence>
        {!guest && <NameGate onSubmit={setGuest} />}
      </AnimatePresence>

      {/* ---------- Phong bì ---------- */}
      <AnimatePresence>
        {guest && !done && (
          <Envelope guest={guest} onOpen={play} onDone={() => setDone(true)} />
        )}
      </AnimatePresence>

      {/* ---------- Nhạc ---------- */}
      {invite.music && (
        <audio
          ref={audio}
          src="/the-next-chapter/music.mp3"
          loop
          preload="auto"
        />
      )}

      {/* ---------- Nút điều khiển nhạc ---------- */}
      {invite.music && done && (
        <button
          onClick={toggleMusic}
          aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
          className="fixed right-4 bottom-4 z-40 grid size-11 cursor-pointer place-items-center rounded-full bg-gold text-[#071b2e] shadow-lg transition-transform hover:scale-105"
        >
          {playing ? (
            <Volume2 className="size-5" />
          ) : (
            <VolumeX className="size-5" />
          )}
        </button>
      )}

      {/* ---------- Thiệp ---------- */}
      <main className="min-h-[100%] bg-[#071b2e] sm:py-8">
        <article
          className="
            relative
            mx-auto
            max-w-[480px]
            overflow-hidden
            bg-gradient-to-b
            from-[#0b2a4a]
            via-[#164e78]
            to-[#2f7fa3]
            shadow-2xl
          "
        >
          {/* Khung viền vàng */}
          <div className="pointer-events-none absolute inset-3 z-20 border-2 border-gold" />

          <div className="pointer-events-none absolute inset-[18px] z-20 border border-gold/60" />

          {/* ---------- Trang trí ---------- */}

          <GraduationCap
            className="absolute top-5 left-5 z-30 size-14 -rotate-12 text-gold drop-shadow"
            strokeWidth={1.5}
          />

          <ScrollText
            className="absolute top-6 right-6 z-30 size-12 rotate-12 text-gold drop-shadow"
            strokeWidth={1.5}
          />

          <GraduationCap
            className="absolute right-6 bottom-6 z-30 size-12 rotate-12 text-gold"
            strokeWidth={1.5}
          />

          {/* ---------- Tiêu đề ---------- */}
          <header className="px-8 pt-16 text-center">
            <p className="font-display text-2xl font-semibold tracking-[0.2em] text-gold">
              THIỆP MỜI
            </p>

            <h1
              className="
                mt-2
                font-display
                text-[clamp(2.5rem,11vw,3.4rem)]
                font-semibold
                leading-tight
                tracking-wide
                text-white
              "
            >
              LỄ TỐT NGHIỆP
            </h1>
          </header>

          {/* ---------- Nội dung ---------- */}
          <section className="px-8 pt-6 pb-18 text-center">
            <p className="text-[15px] text-white/90">
              Trân trọng kính mời{" "}
              {guest && <b className="font-semibold text-gold">{guest}</b>}
              <br />
              đến dự buổi Lễ Tốt Nghiệp của:
            </p>

            <p
              className="
                mt-3
                font-display
                text-[3rem]
                font-semibold
                uppercase
                text-white
              "
            >
              {invite.name}
            </p>

            {/* Đường kẻ */}
            <div className="mx-auto my-2 h-px w-4/5 bg-gold/60" />

            {/* ---------- Thời gian ---------- */}
            <p className="text-lg font-bold tracking-wide text-gold">
              THỜI GIAN:
            </p>

            <p className="mt-1 text-xl font-bold text-white">
              {invite.timeLabel} | {invite.weekday.toUpperCase()}
            </p>

            <p className="text-xl font-bold text-white">
              NGÀY {invite.dateText}
            </p>

            {/* ---------- Địa điểm ---------- */}
            <p className="mt-6 text-lg font-bold tracking-wide text-gold">
              ĐỊA ĐIỂM:
            </p>

            <p className="mt-1 text-xl font-bold uppercase text-white">
              {invite.hall}
            </p>

            <p className="text-xl font-bold uppercase leading-snug text-white">
              {invite.school}
            </p>

            <p className="mx-auto mt-2 max-w-xs text-sm text-white/80">
              ({invite.address})
            </p>

            {/* Nút chỉ đường */}
            <a
              href={invite.mapLink}
              target="_blank"
              rel="noreferrer"
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-gold
                px-5
                py-2
                text-sm
                font-medium
                text-gold
                transition-colors
                hover:bg-gold
                hover:text-[#071b2e]
              "
            >
              <MapPin className="size-4" />
              Chỉ đường
            </a>

            {/* Đường kẻ */}
            <div className="mx-auto my-8 h-px w-4/5 bg-gold/60" />

            {/* ---------- Xác nhận tham dự ---------- */}
            <p className="text-[15px] text-white/90">
              Xác nhận tham dự với <b>{invite.name}</b>
              <br />
              qua số điện thoại:
            </p>

            <a
              href={`tel:${invite.phone.replace(/\s/g, "")}`}
              className="
                mt-2
                inline-flex
                items-center
                gap-2
                text-2xl
                font-bold
                text-white
              "
            >
              <Phone className="size-5 text-gold" />
              {invite.phone}
            </a>
          </section>
        </article>
      </main>
    </>
  );
}
