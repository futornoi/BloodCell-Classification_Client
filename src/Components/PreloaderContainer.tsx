
interface PreloaderContainer {
  title?: string;
}

const Preloader: React.FC<PreloaderContainer> = ({title}) => {
  return (
    <div className="preloader">
      {title ?? 'Loading...'}
    </div>
  );
};

export default Preloader;
