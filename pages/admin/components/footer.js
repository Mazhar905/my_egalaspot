import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="flex items-center justify-between flex-shrink-0 p-4 border-t max-h-14">
                <div>&copy; Reserved by 2024</div>
                <div className="text-sm">
                    Powered By{" "}
                    <Link href="/"
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Hamza Khalid
                    </Link>
                </div>
            </footer>
        </>
    )
}
