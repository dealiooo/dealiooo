import React, { Component } from "react";

import Section from "react-bulma-components/lib/components/section";
import Level from "react-bulma-components/lib/components/level";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Columns from "react-bulma-components/lib/components/columns";
import Container from "react-bulma-components/lib/components/container";
import Heading from "react-bulma-components/lib/components/heading";

import NavigationBar from "../../../components/NavigationBar";
import Chat from "../../../components/Chat";
import PlayerStatus from "./PlayerStatus";

import { socket, GameLobby as GameLobbyAPI } from "../../../api";
import { toast } from "react-toastify";

import "./GameLobby.css";

class GameLobby extends Component {
  constructor(props) {
    super(props);
    this.onEnterGame = this.onEnterGame.bind(this);
    this.onLeaveGame = this.onLeaveGame.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerUnready = this.onPlayerUnready.bind(this);
    this.onStartGame = this.onStartGame.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onReady = this.onReady.bind(this);
    this.onExit = this.onExit.bind(this);
    let gameId = this.props.match.params.id;
    this.state = {
      gameId,
      lobbyName: `${gameId}'s Lobby`,
      startRender: false,
      host: false,
      userId: null,
      userName: null,
      playersStatus: null,
      socket: socket
    };
    GameLobbyAPI.postGameLobbyEnter(gameId);
    socket.on(`game-lobby:${gameId}:enter-game`, this.onEnterGame);
    socket.on(`game-lobby:${gameId}:leave-game`, this.onLeaveGame);
    socket.on(`game-lobby:${gameId}:player-ready`, this.onPlayerReady);
    socket.on(`game-lobby:${gameId}:player-unready`, this.onPlayerUnready);
    socket.on(`game-lobby:${gameId}:start-game`, this.onStartGame);
  }

  componentDidMount() {
    GameLobbyAPI.getGameLobby(this.state.gameId).then(response => {
      if (response.ok) {
        response.text().then(body => {
          body = JSON.parse(body);
          this.setState({ userId: body.id });
          this.setState({ userName: body.name });
          GameLobbyAPI.getGameLobbyPlayersStatus(this.state.gameId).then(
            status => {
              status.result.map(playerStatus => {
                if (this.state.userId === playerStatus.id) {
                  this.setState({ host: playerStatus.Players[0].host });
                }
                return (playerStatus.ready = playerStatus.Players[0].ready);
              });
              this.setState({ playersStatus: status.result });
              this.setState({ startRender: true });
            }
          );
        });
      } else {
        window.location = "/main-lobby";
      }
    });
  }

  onEnterGame(event) {
    if (this.state.gameId === event) {
      GameLobbyAPI.getGameLobbyPlayersStatus(this.state.gameId).then(status => {
        status.result.map(
          playerStatus => (playerStatus.ready = playerStatus.Players[0].ready)
        );
        this.setState({ players_status: status.result });
      });
    }
  }

  onLeaveGame(event) {
    if (this.state.gameId === event.gameId) {
      var temp = this.state.playersStatus;
      this.setState({
        playersStatus: temp.filter(
          playerStatus => playerStatus.id !== event.userId
        )
      });
      if (this.state.userId === event.userId) {
        window.location = "/main-lobby";
      }
    }
  }

  onPlayerReady(event) {
    // TODO: refactor this array functionality to a dictionary
    var temp = this.state.playersStatus;
    var size = temp.length;
    for (var i = 0; i < size; i++) {
      if (temp[i].id === event.userId) {
        temp[i].ready = true;
      }
    }
    this.setState({ playerStatus: temp });
  }

  onPlayerUnready(event) {
    // TODO: refactor this array functionality to a dictionary
    var temp = this.state.playersStatus;
    var size = temp.length;
    for (var i = 0; i < size; i++) {
      if (temp[i].id === event.userId) {
        temp[i].ready = false;
      }
    }
    this.setState({ playerStatus: temp });
  }

  onStartGame(_) {
    window.location = `/game/${this.state.gameId}`;
  }

  onStart(_) {
    GameLobbyAPI.postGameLobbyStart(this.state.gameId).then(result => {
      if (result.message) {
        toast(result.message);
      }
    });
  }

  onReady(_) {
    GameLobbyAPI.postGameLobbyTogglePlayerReady(this.state.gameId).then(
      result => {}
    );
  }

  onExit(_) {
    GameLobbyAPI.postGameLobbyLeave(this.state.gameId).then(
      _ => (window.location = "/main-lobby")
    );
  }

  render() {
    if (this.state.startRender) {
      return (
        <div>
          <NavigationBar
            title={this.state.lobbyName}
            userName={this.state.userName}
          />
          <Columns>
            <Columns.Column>
              <Container className="">
                <Section>
                  <Columns>
                    <Columns.Column size="three-fifths">
                      <Box className="box-room-name">
                        <Heading className="has-text-white">
                          {this.state.lobbyName}
                        </Heading>
                      </Box>
                      <Section>
                        <PlayerStatus status={this.state.playersStatus} />
                      </Section>
                      <Section>
                        <Level>
                          <Level.Item>
                            {this.state.host ? (
                              <Button onClick={this.onStart}>Start</Button>
                            ) : (
                              <div />
                            )}
                          </Level.Item>
                          <Level.Item>
                            <Button onClick={this.onReady}>Ready</Button>
                          </Level.Item>
                          <Level.Item>
                            <Button onClick={this.onExit}>Exit</Button>
                          </Level.Item>
                          <Level.Item />
                        </Level>
                      </Section>
                    </Columns.Column>
                    <Columns.Column className="game-lobby-chat">
                      <Chat
                        socket={this.state.socket}
                        api={GameLobbyAPI.postGameLobbyChat}
                        channel={`game-lobby:${this.state.gameId}:chat`}
                        roomId={this.state.gameId}
                      />
                    </Columns.Column>
                  </Columns>
                </Section>
              </Container>
            </Columns.Column>
          </Columns>
        </div>
      );
    }
    return <Box>Loading Page...</Box>;
  }
}

export default GameLobby;
