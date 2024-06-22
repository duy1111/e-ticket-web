"use client"
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
 

const DashBardPage = () => {


    const editor = useCreateBlockNote({
        u
    });

    console.log(editor)
    return ( 
        <div className="w-full" >
            <BlockNoteView editor={editor} />
        </div>
    );
}
 
export default DashBardPage;