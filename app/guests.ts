/**
 * Cấu hình biệt danh / cách xưng hô cho từng khách mời.
 *
 * - Key: tên khách nhập vào (viết thường, KHÔNG cần dấu cũng được).
 *   Ví dụ "Lan", "lan", "LAN" đều khớp với key "lan".
 * - Value: nội dung sẽ hiển thị trên thiệp thay cho tên.
 *   Nếu có nhiều người trùng tên, để một mảng: ["Linh em gái", "Linh bạn yêu đời"]
 *   -> khách sẽ được chọn mình là ai.
 *
 * Thêm người mới chỉ cần thêm 1 dòng vào NICKNAMES.
 */
export const NICKNAMES: Record<string, string | string[]> = {
  nhạn: "Chích chòe",
  ly: "Hương Ly",
  Thành: "bạn, chú Thành",
  Ngân: "bạn Ngân",
  khang: "Bạn Khang",
  hương: "Bạn Hương",
  thảo: "Bạn Thảo",
  đức: "Bạn Đức",
  linh: ["Máy bào", "Linh Loe"],
  lộc: "A Lộc",
};

/** Chuẩn hoá để so khớp: bỏ khoảng trắng thừa, bỏ dấu, viết thường. */
export function normalizeName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

/** Viết hoa chữ cái đầu mỗi từ: "nguyễn  lan" -> "Nguyễn Lan". */
export function formatName(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toLocaleUpperCase("vi") + w.slice(1))
    .join(" ");
}
const NORMALIZED_NICKNAMES: Record<string, string | string[]> =
  Object.fromEntries(
    Object.entries(NICKNAMES).map(([key, value]) => [
      normalizeName(key),
      value,
    ]),
  );
/**
 * Hàm config chính: nhận tên khách nhập, trả về danh sách cách hiển thị.
 * - Không có trong NICKNAMES -> [tên đã viết hoa]
 * - Có 1 biệt danh -> [biệt danh]
 * - Trùng tên (mảng) -> nhiều lựa chọn để khách tự chọn
 */
export function getGuestOptions(input: string): string[] {
  const nick = NORMALIZED_NICKNAMES[normalizeName(input)];
  if (!nick) return [formatName(input)];
  return Array.isArray(nick) ? nick : [nick];
}
