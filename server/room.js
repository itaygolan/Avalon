import { Room, Client } from "colyseus";
import pickCharacter from './src/queries/pickCharacters';
import characters from './src/queries/characters';

export class AvalonRoom extends Room {

  onInit (options) {
    this.setState({
      players: {},
      characters
    });

  }

  onJoin (client) {
    this.state.players[ client.sessionId ] = pickCharacter(characters)
  }

  onLeave (client) {
    delete this.state.players[ client.sessionId ];
  }

  onMessage (client, data) {
    if (data.action === "left") {
      this.state.players[ client.sessionId ].x -= 1;

    } else if (data.action === "right") {
      this.state.players[ client.sessionId ].x += 1;
    }
  }
}
