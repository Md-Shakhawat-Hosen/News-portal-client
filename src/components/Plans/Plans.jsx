import Title from "../Title/Title";


const Plans = () => {
    return (
      <div>
        <Title title="Plans" subTitle=""></Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-cyan-200 p-6 rounded-lg">
            <div className="flex flex-col justify-between space-y-6">
              <h1>Free 1 Month</h1>
              <div className="flex justify-between items-center ">
                <h1 className="font-bold text-2xl">Premium Individual</h1>
                <div>
                  <h1 className="font-bold text-xl">Free</h1>
                  <h1>For 1 Month</h1>
                </div>
              </div>
              <ol className="list-disc h-[200px]">
                <li>1 premium account</li>
                <li>Cancel anytime</li>
                <li>15 hours/month for reading</li>
              </ol>
            </div>
            <button className="bg-cyan-900 text-white p-4 rounded-lg mt-4 w-full">
              Try free for 1 month
            </button>
          </div>
          <div className="bg-cyan-200 p-6 rounded-lg">
            <div className="flex flex-col justify-between space-y-6">
               <h1>Hurry up take and enjoy</h1>
              <div className="flex justify-between items-center ">
                <h1 className="font-bold text-2xl">Premium Duo</h1>
                <div>
                  <h1 className="font-bold text-xl">$10.56</h1>
                  <h1>per Month</h1>
                </div>
              </div>
              <ol className="list-disc h-[200px]">
                <li>upto 2 premium account </li>
                <li>Cancel anytime</li>
                <li>15 hours/month for reading</li>
              </ol>
            </div>
            <button className="bg-cyan-900 text-white p-4 rounded-lg mt-4 w-full">
              Get premium duo
            </button>
          </div>
          <div className="bg-cyan-200 p-6 rounded-lg">
            <div className="flex flex-col justify-between space-y-6">
              <h1>Enjoy with family</h1>
              <div className="flex justify-between items-center ">
                <h1 className="font-bold text-2xl">Premium Family pack</h1>
                <div>
                  <h1 className="font-bold text-xl">$20.56</h1>
                  <h1>per Month</h1>
                </div>
              </div>
              <ol className="list-disc h-[200px]">
                <li>upto 6 premium account or kids account</li>
                <li>Cancel anytime</li>
                <li>15 hours/month for reading</li>
              </ol>
            </div>
            <button className="bg-cyan-900 text-white p-4 rounded-lg mt-4 w-full">
              Get premium family
            </button>
          </div>
        </div>
      </div>
    );
};

export default Plans;