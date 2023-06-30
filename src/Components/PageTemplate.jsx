export default function Layout({children}){
    return(
        <main style={{minHeight:800, paddingTop : "7rem", backgroundColor: "rgb(254, 242, 242, 0.6)"}}>
            <div className="w-100 h-100">
                {children}
            </div>
        </main>
    );
}