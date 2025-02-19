import clsx from 'clsx';

interface IProps {
  name: string;
  photoSrc: string;
  roles: string[];
  className?: string;
}

const ProfileCard: React.FC<IProps> = ({ name, photoSrc, roles, className }) => {
  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <img
        src={photoSrc}
        alt={`${name} profile pic`}
        className="w-10 h-10 md:w-18 md:h-18 rounded-full mb-2" />

      <h4 className="hidden md:block font-medium text-lg">{name}</h4>
      <p className="capitalize">{roles.join(', ')}</p>
    </div>
  )
}

export default ProfileCard;
