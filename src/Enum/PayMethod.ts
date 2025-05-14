export enum PayMethod {
  CARD = 'CRD',
  MASTERCARD_MOBILE = 'MCM',
  MASTERPASS = 'MPS',
  GOOGLE_PAY = 'GPAY',
  PLATBA24 = 'BTNCS',
  BANK_ACCOUNT = 'BTN360CS', // Platba z účtu
  BANK_KB = 'BTN360CS-0100', // Platba z účtu – Komerční banka, a.s.
  BANK_CSOB = 'BTN360CS-0300', // Platba z účtu – Československá obchodní banka, a. s.
  BANK_MONETA = 'BTN360CS-0600', // Platba z účtu – MONETA Money Bank, a. s.
  BANK_CNB = 'BTN360CS-0710', // Platba z účtu – Česká národní banka
  BANK_CS = 'BTN360CS-0800', // Platba z účtu – Česká spořitelna, a.s.
  BANK_FIO = 'BTN360CS-2010', // Platba z účtu – Fio banka, a.s.
  BANK_UCB = 'BTN360CS-2700', // Platba z účtu – UniCredit Bank Czech Republic and Slovakia, a.s.
  BANK_AIRB = 'BTN360CS-3030', // Platba z účtu – Air Bank a.s.
  BANK_RB = 'BTN360CS-5500', // Platba z účtu – Raiffeisenbank a.s.
  BANK_MBANK = 'BTN360CS-6210', // Platba z účtu – mBank S.A.
  BANK_SBERBANK = 'BTN360CS-6800', // Platba z účtu – Sberbank CZ, a.s.
  APPLE_PAY = 'APAY',
}