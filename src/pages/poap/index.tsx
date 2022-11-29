import { useEffect } from "react";
import { PersonBackground } from "../auth/components/PersonBackground";
import { List } from "./components/List";

export const Home = () => {

    return (
        <main className="mx-auto mb-8 sm:mb-16 pt-16">
            <PersonBackground />
            <List />
        </main >
    );
};