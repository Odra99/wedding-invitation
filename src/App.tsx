/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WeddingInvitationFatimaLuis } from './components/WeddingInvitationFatimaLuis';
import { MusicPlayer } from './components/MusicPlayer';


export default function App() {

  return (
    <div className="min-h-screen bg-mist text-ink antialiased selection:bg-line">
      {/* La Boda Civil de Fatima & Luis: La web es la invitación */}
      <WeddingInvitationFatimaLuis
        
      />
      <MusicPlayer />
    </div>
  );
}
