import { cx } from '../utils/uiClasses.js';

const EmptyState = ({ action, description, tone = 'neutral', title }) => {
  const isError = tone === 'error';
  const isLoading = tone === 'loading';

  return (
    <div
      className={cx(
        'grid min-h-38 grid-cols-[44px_minmax(0,1fr)] items-center gap-3.5 rounded-lg border border-dashed p-5',
        isError
          ? 'border-red-300 bg-red-50 dark:border-red-300/30 dark:bg-red-400/10'
          : 'border-slate-300 bg-slate-50 dark:border-slate-500/20 dark:bg-white/[0.035]',
        isLoading && 'bg-white dark:bg-slate-800',
      )}
    >
      <div
        className={cx(
          'grid size-11 place-items-center rounded-lg font-black',
          isError
            ? 'bg-red-100 text-red-700 dark:bg-red-400/15 dark:text-red-200'
            : 'bg-emerald-50 text-emerald-800 dark:bg-zinc-900 dark:text-zinc-200',
        )}
        aria-hidden="true"
      >
        {tone === 'error' ? '!' : tone === 'loading' ? '...' : '+'}
      </div>
      <div>
        <strong className="block text-base text-slate-950 dark:text-slate-50">{title}</strong>
        <p className={cx('mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400', isError && 'font-bold text-red-700 dark:text-red-300')}>
          {description}
        </p>
      </div>
      {action ? <div className="col-start-2">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
