import { ModeToggle } from '@/components/ui/mode-toggle'
import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <div>
        <ul>
            <li>
                <Link href='/login'>
                Đăng nhập 
                </Link>
            </li>
        </ul>
        <ModeToggle/>
    </div>
  )
}
