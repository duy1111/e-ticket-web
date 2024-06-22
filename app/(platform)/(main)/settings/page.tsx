import { currentUser } from "@/lib/auth";



const SettingsPage = async() => {
    const user = await currentUser();

    return ( 
        <div>
            
            <h1>Settings</h1>
            <p>Settings page content</p>
            <div>{JSON.stringify(user)}</div>
            {/* <button onClick={signOut}>Sign Out</button> */}
        </div>
    );
}
 
export default SettingsPage;