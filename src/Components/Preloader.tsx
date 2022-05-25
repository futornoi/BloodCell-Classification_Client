
interface Preloader {
  title?: string;
}

const Preloader: React.FC<Preloader> = ({title}) => {
  return (
    <div className="preloader">
      {title ?? 'Loading...'}
    </div>
  );
};

export default Preloader;
