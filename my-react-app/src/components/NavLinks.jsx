import React from 'react'

const NavLinks = () => {
    const links = [
        {name: "Home",
        //  path:"/pages/Home"
        submenu:true,
        sublinks:[
            {name:"News and Updates",path:"/pages/NewsAndUpdates"},
            {name:"Gallery",path:"/pages/Gallery"},
            {name:"Become a member",path:"/pages/BecomeAMember"},
            {name:"Counter",path:"/pages/Counter"},
            {name:"Messages",path:"/pages/Messages"},
        ]
        },
        {name: "Giving Back", 
        submenu:true,
        sublinks:[
            {name:"Alumini Initiatives",path:"/pages/NewsAndUpdates"},
            {name:"Donate",path:"/pages/Gallery"},
        ]
        // path:"/pages/GivingBack"
        },
        {name: "Community Events",
        //  path:"/pages/CommunityEvents"
        submenu:true,
        sublinks:[
            {name:"Events",path:"/pages/NewsAndUpdates"},
            {name:"Reunion",path:"/pages/Gallery"},
          
        ]
        },
        {name: "Contact", path:"/pages/Contact"},
        
    ]
  return (
    <>
      {/* {links.map((link) =>(
        <div key={link.path} className='px-3 text-left md:cursor-pointer '>
            <a href={link.path} className="block py-3 px-1 md:py-6 hover:text-blue-500 duration-300">{link.name}</a>

            {link.submenu && (
                <div className='absolute top-20'>
                <div className='bg-white p-4'>
                <div className="flex flex-col gap-2 " >
                    {link.sublinks.map((sublink) => (
                       <div key={sublink.path}>
                        <a href={sublink.path}className="text-sm text-gray-600 my-2.5 hover:text-blue-500 duration-300">{sublink.name}</a>
                        </div>
                    ))}
                </div>
                </div>
                </div>
            )}
        </div>
      ))} */}
      {links.map((link) => (
    <div key={link.path} className='px-3 text-left md:cursor-pointer group z-10 '>
        <a href={link.path} className="block py-3 px-1 md:py-1 hover:text-blue-500 duration-300  ">{link.name}</a>

        {link.submenu && (
            <div className='absolute top-20 hidden group-hover:block hover:block z-20' key={`${link.path}-submenu`}>
                <div className='py-3 '>
                  <div className='w-4 h-4 left-3 absolute mt-1 bg-gray-400 rotate-45'>

                  </div>
                </div>
                <div className='bg-gray-400 p-4'>
                    <div className="flex flex-col gap-2">
                        {link.sublinks.map((sublink) => (
                            <div key={sublink.path}>
                                <a href={sublink.path} className="text-sm text-gray-600 my-2.5 hover:text-blue-500 duration-300">{sublink.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
))}

    </>
  )
}

export default NavLinks
