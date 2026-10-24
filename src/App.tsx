/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { WeddingInvitationFatimaLuis } from './components/WeddingInvitationFatimaLuis';
import { NextjsExportModal } from './components/NextjsExportModal';
import { MusicPlayer } from './components/MusicPlayer';


export default function App() {
  const [nextJsModalOpen, setNextJsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eaf3fa] via-[#f3f8fd] to-[#e4eef7] text-[#1b476e] font-sans antialiased selection:bg-sky-200">
      {/* La Boda Civil de Fatima & Luis: La web es la invitación */}
      <WeddingInvitationFatimaLuis
        
      />
      <MusicPlayer />
    </div>
  );
}
