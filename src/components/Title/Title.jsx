

const Title = ({title,subTitle}) => {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="font-bold text-3xl text-center border-b-2 my-5 pb-5">{title}</h1>
            <h4 className="text-xl text-center">{subTitle}</h4>
        </div>
    );
};

export default Title;