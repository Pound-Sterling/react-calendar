

export default function getName(name:string, fullname?:string ){
    if(fullname) {
        return name[0].toUpperCase() + fullname[1].toUpperCase()
    } else {
        return name[0].toUpperCase() + name[1].toUpperCase()
    }  
}