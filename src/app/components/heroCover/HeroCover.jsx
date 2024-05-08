import Image from "next/image";
import Link from "next/link";

const HeroCover = ({ key, item }) => {
  return (
    <article key={key} className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
        <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl z-0' key={key}/>
            {item.img && (
                <Image
                    key={key}
                    src={item.img}
                    alt=""
                    fill
                    className='w-full h-full object-center object-cover rounded-3xl -z-10'
                    sizes='100vw'
                    priority
                />
            )}
        <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
            <Link href={`/posts/${item.slug}`} className='mt-6'>
                <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
                <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                    {item.title}
                </span>
                </h1>
            </Link>
            <div className='hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in' dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/>
        </div>
    </article>
  );
};

export default HeroCover;