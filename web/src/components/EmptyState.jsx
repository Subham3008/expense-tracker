const EmptyState = ({ action, description, tone = 'neutral', title }) => {
  return (
    <div className={`empty-state ${tone}`}>
      <div className="empty-state-icon" aria-hidden="true">
        {tone === 'error' ? '!' : tone === 'loading' ? '...' : '+'}
      </div>
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      {action ? <div className="empty-state-action">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
