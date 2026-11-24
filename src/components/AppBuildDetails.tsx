import styles from './AppBuildDetails.module.css';

export default function AppBuildDetails({ stack }: { stack: readonly string[] }) {
  return (
    <div className={styles.details}>
      <p><strong>Working app.</strong> I designed the app and used Codex and Claude Code to write the code.</p>
      <dl>
        <dt>Tech stack</dt>
        <dd>{stack.join(' · ')}</dd>
      </dl>
    </div>
  );
}
