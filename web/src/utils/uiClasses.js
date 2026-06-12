export const cx = (...classes) => classes.filter(Boolean).join(' ');

export const layoutClasses = {
  page:
    'mx-auto grid w-full max-w-[1220px] gap-5 sm:gap-6',
  pageHeader:
    'flex min-h-24 flex-col items-start justify-between gap-4 rounded-lg border border-emerald-950/10 bg-white p-5 shadow-[0_18px_52px_rgba(17,25,23,0.08)] sm:p-7 lg:flex-row lg:items-end dark:border-slate-500/20 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:shadow-[0_18px_52px_rgba(0,0,0,0.38)]',
  pageSubtitle: 'mt-2 block max-w-2xl text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400',
  pageTitle: 'mt-1 font-display text-4xl font-black tracking-normal text-slate-950 dark:text-slate-50',
  panel:
    'grid min-h-0 gap-5 rounded-lg border border-emerald-950/10 bg-white p-5 shadow-[0_18px_52px_rgba(17,25,23,0.08)] sm:p-6 dark:border-slate-500/20 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 dark:shadow-[0_18px_52px_rgba(0,0,0,0.38)]',
  panelHeadingRow: 'flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between',
  panelTitle: 'mt-1 font-display text-lg font-extrabold text-slate-950 dark:text-slate-50',
  sectionKicker: 'm-0 text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:text-slate-400',
};

export const buttonClasses = {
  primary:
    'inline-flex min-h-11 items-center justify-center rounded-lg border border-transparent bg-emerald-700 px-4 py-2.5 text-sm font-extrabold text-white no-underline hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gradient-to-br dark:from-emerald-400 dark:to-emerald-300 dark:text-slate-950 dark:shadow-[0_12px_28px_rgba(72,213,151,0.16)] dark:hover:from-emerald-300 dark:hover:to-emerald-200',
  secondary:
    'inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-700 hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-55 dark:border-slate-500/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200',
  text:
    'inline-flex min-h-9 items-center justify-center rounded-lg border border-transparent bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-200 dark:hover:bg-emerald-400/15',
  danger:
    'inline-flex min-h-9 items-center justify-center rounded-lg border border-transparent bg-red-50 px-3 py-2 text-sm font-extrabold text-red-700 hover:bg-red-100 dark:bg-red-400/10 dark:text-red-200 dark:hover:bg-red-400/15',
};

export const formClasses = {
  errorText: 'text-sm font-bold text-red-700 dark:text-red-300',
  field: 'grid min-w-0 gap-2',
  input:
    'min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none hover:border-slate-400 focus:border-emerald-700 focus:shadow-[0_0_0_4px_rgba(15,107,79,0.18)] aria-invalid:border-red-600 dark:border-slate-500/20 dark:bg-slate-950/70 dark:text-slate-50 dark:hover:border-slate-400/40 dark:focus:border-emerald-400 dark:focus:shadow-[0_0_0_4px_rgba(72,213,151,0.26)]',
  label: 'text-sm font-extrabold text-slate-700 dark:text-slate-300',
};

export const cardClasses = {
  metric:
    'relative grid min-h-36 gap-2 overflow-hidden rounded-lg border border-emerald-950/10 bg-white p-5 shadow-[0_18px_52px_rgba(17,25,23,0.08)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-emerald-700 hover:-translate-y-0.5 dark:border-slate-500/20 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 dark:shadow-[0_18px_52px_rgba(0,0,0,0.38)] dark:before:bg-gradient-to-b dark:before:from-emerald-400 dark:before:to-blue-400',
  surface:
    'rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-500/20 dark:bg-white/[0.035]',
};
