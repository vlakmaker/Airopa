import { getAllPosts } from "@/lib/content";
import type { Post } from "@/types/content";
import { useEffect, useState } from "react";

export function DebugPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [debugInfo, setDebugInfo] = useState<string>('Loading...');

    useEffect(() => {
        setDebugInfo('Calling getAllPosts...');
        getAllPosts()
            .then(result => {
                setDebugInfo(`getAllPosts returned ${result.length} posts`);
                setPosts(result);
            })
            .catch(error => {
                setDebugInfo(`Error: ${error.message}`);
            });
    }, []);

    if (!posts.length) {
        return (
            <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
                <p>⚠️ No markdown posts found!</p>
                <p className="text-sm mt-2 text-gray-600">Debug: {debugInfo}</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Detected Markdown Posts</h2>
            <ul className="space-y-2">
                {posts.map((p) => (
                    <li key={p.slug} className="p-2 border rounded bg-card">
                        <strong>{p.data.title}</strong> — <em>{p.data.pillar}</em>
                        <br />
                        <a
                            href={p.data.canonical}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                        >
                            {p.data.canonical}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
