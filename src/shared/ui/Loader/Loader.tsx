import * as styles from './Loader.module.scss';

interface LoaderProps {
  size?: string;
  inButton?: boolean;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { size = '100', inButton } = props;

  // Calculate new sizes based on the original sizes and the new size ratio
  const newSize = parseInt(size, 10);
  const scaleFactor = newSize / 100; // Assuming the original size is 100px
  const scaledSize = `${newSize}px`;

  const loaderStyle = {
    width: scaledSize,
    height: scaledSize,
  };

  const wrapperStyle = {
    width: scaledSize,
    height: scaledSize,
  };

  const spinnerSize = `${72 * scaleFactor}px`;
  // If Loader is used in a button, use the same color as the text
  const spinnerColor = inButton ? 'var(--color-text-primary)' : 'var(--color-primary)';

  const spinnerStyle = {
    width: spinnerSize,
    height: spinnerSize,
    top: `${14 * scaleFactor}px`,
    left: `${14 * scaleFactor}px`,
    borderWidth: `${8 * scaleFactor}px`,
    borderColor: `${spinnerColor} transparent`,
  };

  return (
    <div style={loaderStyle}>
      <div className={styles.loaderWrapper} style={wrapperStyle}>
        <div style={spinnerStyle} />
      </div>
    </div>
  );
};
