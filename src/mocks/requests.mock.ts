import type { AidApplication, ApprovalDecision } from '@/types';
import { CITIES, createRng, isoDaysAgo, pick, randomFullName, randomInt, randomMobile, randomNationalId } from './seed';

const rng = createRng(1010);

const PROVINCES = ['تهران', 'خراسان رضوی', 'اصفهان', 'فارس', 'آذربایجان شرقی', 'خوزستان', 'البرز'];
const DISTRICTS = ['منطقه ۱', 'منطقه ۳', 'منطقه ۵', 'منطقه ۷', 'منطقه ۹', 'حاشیه شهر'];
const GENDERS: AidApplication['gender'][] = ['مرد', 'زن'];
const CUSTODY_TYPES: AidApplication['custodyType'][] = ['دارای سرپرست', 'بدون سرپرست', 'زن سرپرست خانوار', 'سالمند بی‌سرپرست'];
const NATIONALITIES: AidApplication['nationality'][] = ['ایرانی', 'افغان', 'عراقی', 'سایر'];
const RELIGIONS: AidApplication['religion'][] = ['اسلام', 'مسیحیت', 'کلیمی', 'زرتشتی', 'سایر'];
const AID_TYPES: AidApplication['aidType'][] = ['نقدی', 'درمانی', 'تحصیلی', 'جهیزیه', 'مسکن', 'اطعام', 'سایر'];
const REFERRERS = ['مسجد محل', 'همسایه', 'شورای محله', 'مددکار اجتماعی', 'خودمعرف', 'سازمان بهزیستی'];
const DESCRIPTIONS = [
  'نیازمند کمک هزینه درمان به دلیل بیماری صعب‌العلاج',
  'درخواست کمک تحصیلی برای فرزندان',
  'نیاز به کمک هزینه اجاره منزل',
  'درخواست بسته معیشتی برای خانواده',
  'نیازمند کمک برای تهیه جهیزیه',
];

export const requestsMock: AidApplication[] = Array.from({ length: 26 }, (_, i) => {
  const { firstName, lastName } = randomFullName(rng);
  const requestDaysAgo = randomInt(rng, 0, 200);
  const statusRoll = rng();
  const status: AidApplication['status'] = statusRoll > 0.55 ? 'تایید شده' : statusRoll > 0.3 ? 'رد شده' : 'در انتظار بررسی';

  const approval =
    status === 'در انتظار بررسی'
      ? undefined
      : {
          approvalDate: isoDaysAgo(randomInt(rng, 0, requestDaysAgo)),
          decision: (status === 'تایید شده' ? 'تایید' : 'رد') as ApprovalDecision,
          reason:
            status === 'تایید شده'
              ? 'مدارک کامل و شرایط اقتصادی خانوار تایید شد.'
              : 'عدم تطابق شرایط با ضوابط حمایتی خیریه.',
          description: rng() > 0.5 ? 'بررسی توسط مددکار اجتماعی انجام شد.' : undefined,
        };

  return {
    id: `request_${i + 1}`,
    requestNumber: `REQ-${(10500 + i).toString()}`,
    requestDate: isoDaysAgo(requestDaysAgo),
    nationalId: randomNationalId(rng),
    firstName,
    lastName,
    gender: pick(rng, GENDERS),
    custodyType: pick(rng, CUSTODY_TYPES),
    nationality: pick(rng, NATIONALITIES),
    religion: pick(rng, RELIGIONS),
    province: pick(rng, PROVINCES),
    city: pick(rng, CITIES),
    district: pick(rng, DISTRICTS),
    address: `${pick(rng, CITIES)}، ${pick(rng, DISTRICTS)}، خیابان ${pick(rng, ['امام', 'شهید بهشتی', 'معلم', 'فردوسی'])}`,
    mobile: randomMobile(rng),
    phone: rng() > 0.5 ? `0${randomInt(rng, 21, 51)}${randomInt(rng, 10000000, 99999999)}` : undefined,
    aidType: pick(rng, AID_TYPES),
    description: pick(rng, DESCRIPTIONS),
    referrer: pick(rng, REFERRERS),
    status,
    approval,
    createdAt: isoDaysAgo(requestDaysAgo),
    updatedAt: isoDaysAgo(randomInt(rng, 0, requestDaysAgo)),
  };
}).sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
