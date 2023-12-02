import Title from "../Title/Title";
import logo_1 from "../../../public/images/lgo-1.jpg";
import logo_2 from "../../../public/images/logo-2.jpg";

const Publisher = () => {

    return (
      <div>
        <Title title="Publisher" subTitle=""></Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card  bg-base-100 shadow-xl">
            <figure className="px-3 pt-10">
              <img
                src={logo_1}
                alt="Shoes"
                className="rounded-full w-[300px] h-[300px]"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Mango People</h2>
            </div>
          </div>
          <div className="card  bg-base-100 shadow-xl">
            <figure className="px-3 pt-10">
              <img
                src={logo_2}
                alt="Shoes"
                className="rounded-full w-[300px] h-[300px]"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Perona</h2>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Publisher;