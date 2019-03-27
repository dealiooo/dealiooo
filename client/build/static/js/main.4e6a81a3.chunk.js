(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    133: function(e, t, a) {
      var n = a(134),
        r = a(163);
      e.exports = n.connect(r);
    },
    160: function(e, t) {},
    163: function(e, t) {
      e.exports = Object({ NODE_ENV: "production", PUBLIC_URL: "" })
        .REACT_APP_LOCAL_SERVER
        ? "http://localhost:8000"
        : "https://dealiooo.herokuapp.com/";
    },
    164: function(e, t, a) {
      var n = a(42),
        r = function(e) {
          return e.json();
        };
      e.exports = {
        getLogin: function() {
          return n("/login", {}, "get");
        },
        getRegister: function() {
          return n("/register", {}, "get");
        },
        getForgotPassword: function() {
          return n("/forgot-password", {}, "get");
        },
        getNewPassword: function(e) {
          return n("/new-password/".concat(e), {}, "get");
        },
        postLogin: function(e, t) {
          return n("/login", { email: e, password: t }).then(r);
        },
        postRegister: function(e, t, a) {
          return n("/register", { name: e, email: t, password: a });
        },
        postForgotPassword: function(e) {
          return n("/forgot-password", { email: e });
        },
        postNewPassword: function(e, t) {
          return n("/new-password/".concat(e), { password: t });
        },
        postLogout: function() {
          return n("/logout", {});
        }
      };
    },
    165: function(e, t, a) {
      var n = a(42);
      e.exports = {
        getGame: function(e) {
          return n("/game/".concat(e), {}, "get");
        },
        postGameChat: function(e) {
          var t = e.roomId,
            a = e.message;
          return n("/game/".concat(t, "/chat"), { message: a });
        },
        postGameClick: function(e, t) {
          return n("/game/".concat(e, "/click"), { clickInput: t });
        },
        postGameEndTurn: function(e) {
          return n("/game/".concat(e, "/endTurn"), {});
        },
        postGameForfeit: function(e) {
          return n("/game/".concat(e, "/forfeit"), {});
        },
        postGameJoin: function(e) {
          return n("/game/".concat(e, "/join"), {});
        },
        postGameStartGame: function(e) {
          return n("/game/".concat(e, "/startGame"), {});
        },
        postGameUpdate: function(e) {
          return n("/game/".concat(e, "/update"), {});
        }
      };
    },
    166: function(e, t, a) {
      var n = a(42),
        r = a(73);
      e.exports = {
        getGameLobby: function(e) {
          return n("/game-lobby/".concat(e), {}, "get");
        },
        getGameLobbyInfo: function(e) {
          return n("/game-lobby/".concat(e, "/info"), {}, "get").then(r);
        },
        getGameLobbyPlayersStatus: function(e) {
          return n("/game-lobby/".concat(e, "/status"), {}, "get").then(r);
        },
        postGameLobbyChat: function(e) {
          var t = e.roomId,
            a = e.message;
          return n("/game-lobby/".concat(t, "/chat"), { message: a });
        },
        postGameLobbyEnter: function(e) {
          return n("/game-lobby/".concat(e, "/enter"), {});
        },
        postGameLobbyJoin: function(e) {
          return n("/game-lobby/".concat(e, "/join"), {}).then(r);
        },
        postGameLobbyLeave: function(e) {
          return n("/game-lobby/".concat(e, "/leave"), {}).then(r);
        },
        postGameLobbyStart: function(e) {
          return n("/game-lobby/".concat(e, "/start"), {}).then(r);
        },
        postGameLobbyTogglePlayerReady: function(e) {
          return n("/game-lobby/".concat(e, "/toggle-ready")).then(r);
        }
      };
    },
    167: function(e, t, a) {
      var n = a(42),
        r = a(73);
      e.exports = {
        getMainLobby: function() {
          return n("/main-lobby", {}, "get");
        },
        postMainLobby: function() {
          return n("/main-lobby", {}).then(r);
        },
        postMainLobbyChat: function(e) {
          var t = e.message;
          return n("/main-lobby/chat", { message: t });
        },
        postMainLobbyCreateGame: function(e, t) {
          return n("/main-lobby/create-game", {
            roomName: e,
            playerCapacity: t
          }).then(r);
        }
      };
    },
    205: function(e, t, a) {},
    207: function(e, t, a) {},
    234: function(e, t, a) {},
    236: function(e, t, a) {},
    238: function(e, t, a) {},
    242: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(27),
        l = a.n(o),
        c = (a(83), a(8)),
        i = a(12),
        s = a(10),
        m = a(9),
        u = a(11),
        d = a(31),
        p = a(245),
        b = a(77),
        h = (a(97), a(99), a(23)),
        f = a(28),
        g = a.n(f),
        y = [
          {
            path: "/",
            exact: !0,
            component: (function(e) {
              function t() {
                return (
                  Object(c.a)(this, t),
                  Object(s.a)(this, Object(m.a)(t).apply(this, arguments))
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "render",
                    value: function() {
                      return r.a.createElement(
                        g.a,
                        null,
                        r.a.createElement(
                          "h1",
                          null,
                          "Using the homepage to test the ui easier, delete later"
                        ),
                        r.a.createElement(
                          "ul",
                          null,
                          Xe.map(function(e) {
                            return r.a.createElement(
                              "li",
                              { style: { margin: "15px" } },
                              r.a.createElement(
                                "a",
                                {
                                  className: "button",
                                  href: "".concat(e.path)
                                },
                                e.component.name
                              )
                            );
                          })
                        )
                      );
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ],
        E = a(2),
        v = a(13),
        C = a.n(v),
        O = a(15),
        j = a.n(O),
        k = a(14),
        S = a.n(k),
        w = a(43),
        G = (a(60),
        (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(m.a)(t).call(this, e)
              )).onMessageReceived = a.onMessageReceived.bind(
                Object(E.a)(Object(E.a)(a))
              )),
              a.props.socket.on(a.props.channel, a.onMessageReceived),
              (a.state = { log: [] }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "componentDidMount",
                value: function() {
                  this.ps = new w.a(l.a.findDOMNode(this));
                }
              },
              {
                key: "componentDidUpdate",
                value: function(e) {
                  (l.a.findDOMNode(this).scrollTop = l.a.findDOMNode(
                    this
                  ).scrollHeight),
                    this.ps.update();
                }
              },
              {
                key: "onMessageReceived",
                value: function(e) {
                  this.setState({ log: this.state.log.concat(e) });
                }
              },
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    j.a,
                    null,
                    this.state.log.map(function(e, t) {
                      return r.a.createElement("p", { key: t }, e);
                    })
                  );
                }
              }
            ]),
            t
          );
        })(n.Component)),
        I = a(25),
        L = a(6),
        N = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(m.a)(t).call(this, e)
              )).onChange = function(e) {
                var t =
                  "checkbox" === e.target.type
                    ? e.target.checked
                    : e.target.value;
                a.setState(Object(I.a)({}, e.target.name, t));
              }),
              (a.onSubmit = function(e) {
                e.preventDefault(),
                  a.props.api({
                    roomId: a.props.roomId,
                    message: a.state.message
                  }),
                  a.setState({ message: "" });
              }),
              (a.onChange = a.onChange.bind(Object(E.a)(Object(E.a)(a)))),
              (a.onSubmit = a.onSubmit.bind(Object(E.a)(Object(E.a)(a)))),
              (a.state = { message: "" }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.state.message;
                  return r.a.createElement(
                    "form",
                    { onSubmit: this.onSubmit },
                    r.a.createElement(
                      L.Field,
                      { className: "has-addons" },
                      r.a.createElement(
                        L.Control,
                        { className: "is-expanded" },
                        r.a.createElement(L.Input, {
                          name: "message",
                          type: "text",
                          onChange: this.onChange,
                          value: e,
                          placeholder: "Message"
                        })
                      ),
                      r.a.createElement(
                        L.Control,
                        null,
                        r.a.createElement(
                          S.a,
                          { className: "is-fullwidth" },
                          "Submit"
                        )
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        x = (function(e) {
          function t() {
            return (
              Object(c.a)(this, t),
              Object(s.a)(this, Object(m.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.socket,
                    a = e.api,
                    n = e.roomId,
                    o = e.channel;
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(G, { socket: t, channel: o }),
                    r.a.createElement(N, { roomId: n, api: a })
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        P = a(4),
        R = function(e) {
          var t = e.gameId;
          return r.a.createElement(
            "div",
            { className: "gamechat" },
            r.a.createElement(x, {
              api: P.Game.postGameChat,
              socket: P.socket,
              channel: "game:".concat(t, ":chat"),
              roomId: t
            })
          );
        },
        F = a(20),
        _ = a.n(F),
        M = a(17),
        D = a.n(M),
        T = a(19),
        A = a.n(T),
        H = a(37),
        z = a.n(H),
        J = function(e) {
          var t = e.card;
          return r.a.createElement(
            A.a,
            { key: t.id },
            r.a.createElement(
              A.a.Header,
              null,
              r.a.createElement(A.a.Header.Title, null, t.name)
            ),
            r.a.createElement(A.a.Content, { className: t.mainColor }, "_")
          );
        },
        U = function(e) {
          var t = e.card;
          return r.a.createElement(
            A.a,
            { key: t.id },
            r.a.createElement(
              A.a.Header,
              null,
              r.a.createElement(A.a.Header.Title, null, t.name)
            ),
            r.a.createElement(A.a.Content, null, t.mainColor || "_")
          );
        },
        W = function(e) {
          var t = e.name,
            a = e.frequency;
          return r.a.createElement(
            A.a,
            { key: t },
            r.a.createElement(
              A.a.Header,
              null,
              r.a.createElement(A.a.Header.Title, null, a)
            ),
            r.a.createElement(A.a.Content, null, t)
          );
        },
        q = function(e) {
          var t = e.name,
            a = e.frequency;
          return r.a.createElement(
            A.a,
            { key: t },
            r.a.createElement(
              A.a.Header,
              null,
              r.a.createElement(A.a.Header.Title, null, a)
            ),
            r.a.createElement(A.a.Content, null, t)
          );
        },
        B = function(e) {
          var t = e.card,
            a = e.onClick;
          return r.a.createElement(z.a, {
            key: t.id,
            src: "" + "/cards/".concat(t.type, "/").concat(t.name, ".jpg"),
            onClick: a,
            alt: "".concat(t.name)
          });
        },
        V = function(e) {
          var t = e.card,
            a = e.onClick;
          return r.a.createElement(B, {
            card: t,
            onClick: function() {
              return a(t);
            }
          });
        },
        K = function(e) {
          var t = e.cardCount;
          return r.a.createElement(
            D.a,
            { kind: "parent", size: 12, style: { justifyContent: "center" } },
            r.a.createElement(
              D.a,
              { kind: "child", size: 12 },
              r.a.createElement(
                "div",
                null,
                r.a.createElement("h1", null, "Cards: ", t)
              )
            )
          );
        },
        Q = { id: 99999, name: "spawned", type: "auxilary" },
        X = function() {
          return r.a.createElement(B, { card: Q });
        };
      function Y(e) {
        return e.map(function(e) {
          return r.a.createElement(U, { card: e });
        });
      }
      function Z(e) {
        return e.map(function(e) {
          return r.a.createElement(J, { card: e });
        });
      }
      function $(e) {
        var t = { house: 0, hotel: 0 };
        return (
          e.forEach(function(e) {
            return t[e.name]++;
          }),
          Object.keys(t).map(function(e) {
            return r.a.createElement(W, { name: e, frequency: t[e] });
          })
        );
      }
      function ee(e) {
        var t = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 10: 0 };
        return (
          e.forEach(function(e) {
            return t[e.value]++;
          }),
          Object.keys(t).map(function(e) {
            return r.a.createElement(q, { name: e, frequency: t[e] });
          })
        );
      }
      var te = {
        bank: "bank_cards",
        property: "property_cards",
        building: "building_cards",
        action: "action_cards"
      };
      var ae = { 2: [12], 3: [6, 6], 4: [6, 6, 10], 5: [6, 6, 6, 6] };
      var ne = a(44),
        re = a.n(ne),
        oe = (function(e) {
          function t() {
            var e, a;
            Object(c.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(s.a)(
                this,
                (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
              )).state = { show: !1 }),
              (a.open = function() {
                return a.setState({ show: !0 });
              }),
              (a.close = function() {
                return a.setState({ show: !1 });
              }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    "div",
                    null,
                    r.a.createElement(S.a, { onClick: this.open }, "+"),
                    r.a.createElement(
                      re.a,
                      Object.assign(
                        { show: this.state.show, onClose: this.close },
                        this.props.modal
                      ),
                      this.props.children
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component);
      oe.defaultProps = { modal: {} };
      var le = oe,
        ce = function(e) {
          var t = e.cards,
            a = e.stackType;
          return r.a.createElement(
            D.a,
            {
              kind: "child",
              size: (function(e) {
                switch (e) {
                  case te.action:
                  case te.building:
                    return 2;
                  case te.bank:
                  case te.property:
                    return 4;
                  default:
                    return 0;
                }
              })(a)
            },
            r.a.createElement(
              j.a,
              null,
              r.a.createElement(
                _.a,
                { renderAs: "nav" },
                r.a.createElement(
                  _.a.Side,
                  { align: "left" },
                  r.a.createElement(
                    _.a.Item,
                    null,
                    ""
                      .concat(
                        (function(e) {
                          switch (e) {
                            case te.bank:
                              return "\ud83c\udfe6";
                            case te.building:
                              return "\ud83c\udfe2";
                            case te.property:
                              return "\ud83c\udfe0";
                            case te.action:
                              return "\ud83d\udeb4\u200d";
                            default:
                              return "";
                          }
                        })(a),
                        " + "
                      )
                      .concat(
                        (function(e) {
                          var t;
                          return (t = []).concat
                            .apply(t, Object(h.a)(e))
                            .reduce(function(e, t) {
                              return e + t.value;
                            }, 0);
                        })(t)
                      )
                  )
                ),
                r.a.createElement(
                  _.a.Side,
                  { align: "right" },
                  r.a.createElement(
                    _.a.Item,
                    null,
                    r.a.createElement(
                      le,
                      null,
                      (function(e) {
                        var t;
                        return (t = []).concat
                          .apply(t, Object(h.a)(e))
                          .map(function(e) {
                            return r.a.createElement(B, { card: e });
                          });
                      })(t)
                    )
                  )
                )
              ),
              r.a.createElement(
                D.a,
                null,
                (function(e, t) {
                  return {
                    bank_cards: ee,
                    building_cards: $,
                    property_cards: Z,
                    action_cards: Y
                  }
                    [t](e)
                    .map(function(e) {
                      return r.a.createElement(r.a.Fragment, null, e);
                    });
                })(t, a)
              )
            )
          );
        },
        ie = function(e) {
          var t = e.bank_cards,
            a = e.property_cards,
            n = e.action_cards,
            o = e.building_cards;
          return r.a.createElement(
            D.a,
            { kind: "parent", size: 12 },
            r.a.createElement(ce, { cards: t, stackType: te.bank }),
            r.a.createElement(ce, { cards: a, stackType: te.property }),
            r.a.createElement(ce, { cards: n, stackType: te.action }),
            r.a.createElement(ce, { cards: o, stackType: te.building })
          );
        },
        se = function(e) {
          var t,
            a,
            n,
            o = e.playerInfo,
            l = e.onHandCardClicked;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement(
              D.a,
              { kind: "ancestor" },
              r.a.createElement(ie, o)
            ),
            r.a.createElement(
              D.a,
              { kind: "ancestor" },
              Array.isArray(o.hand)
                ? ((a = o.hand),
                  (n = l),
                  r.a.createElement(
                    D.a,
                    {
                      kind: "parent",
                      size: 12,
                      style: { justifyContent: "center" }
                    },
                    a.map(function(e) {
                      return r.a.createElement(
                        D.a,
                        {
                          key: e.id,
                          kind: "child",
                          size: 1,
                          style: { padding: "2px" }
                        },
                        r.a.createElement(V, {
                          card: e,
                          onClick: function() {
                            return n(e);
                          }
                        })
                      );
                    })
                  ))
                : ((t = o.hand),
                  r.a.createElement(
                    D.a,
                    {
                      kind: "parent",
                      size: 12,
                      style: { justifyContent: "center" }
                    },
                    r.a.createElement(
                      D.a,
                      { kind: "child", size: 12 },
                      r.a.createElement(K, { cardCount: t }),
                      ";"
                    )
                  ))
            )
          );
        },
        me = function(e) {
          var t = e.playerInfos;
          return r.a.createElement(
            C.a,
            null,
            t.map(function(e, a) {
              return r.a.createElement(
                C.a.Column,
                { size: ((n = t.length), (o = a), ae[n + 1][o]) },
                r.a.createElement(se, { playerInfo: e })
              );
              var n, o;
            })
          );
        },
        ue = function(e) {
          var t = e.lastDiscard;
          return r.a.createElement(
            D.a,
            {
              kind: "ancestor",
              className: "has-background-grey-darker",
              style: {
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 0,
                marginRight: 0
              }
            },
            r.a.createElement(
              D.a,
              { kind: "parent", size: 1 },
              r.a.createElement(
                D.a,
                { kind: "child", style: { padding: 2 } },
                t
                  ? r.a.createElement(B, { card: t })
                  : r.a.createElement(X, null)
              )
            )
          );
        },
        de = (function(e) {
          function t() {
            return (
              Object(c.a)(this, t),
              Object(s.a)(this, Object(m.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.userId,
                    a = e.playersInfo,
                    n = e.lastDiscard,
                    o = e.onHandCardClicked,
                    l = a.filter(function(e) {
                      return e.id === t;
                    })[0],
                    c = a.filter(function(e) {
                      return e.id !== t;
                    });
                  return r.a.createElement(
                    "div",
                    {
                      className: "has-background-white-ter",
                      style: {
                        height: "100%",
                        display: "flex",
                        alignItems: "stretch",
                        justifyContent: "center",
                        flexDirection: "column",
                        padding: 8
                      }
                    },
                    r.a.createElement(me, { playerInfos: c }),
                    r.a.createElement(ue, { lastDiscard: n }),
                    r.a.createElement(se, {
                      playerInfo: l,
                      onHandCardClicked: o,
                      showHandCards: !0
                    })
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        pe = a(16),
        be = a.n(pe),
        he = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(m.a)(t).call(this, e)
              )).handleOptionChanged = function(e) {
                a.setState({ option: e.target.value });
              }),
              (a.onPromptSubmit = function(e) {
                e.preventDefault(),
                  a.props.onPromptSubmit(a.state.option),
                  a.setState({ option: 0 });
              }),
              (a.state = { option: 0 }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.activeHandCard,
                    a = e.onEndTurn,
                    n = e.onForfeit,
                    o = e.generalInfo,
                    l = e.promptsInfo;
                  return r.a.createElement(
                    be.a,
                    null,
                    r.a.createElement(
                      be.a,
                      null,
                      t
                        ? r.a.createElement(B, { card: t })
                        : r.a.createElement(X, null)
                    ),
                    r.a.createElement(
                      be.a,
                      { style: { padding: "12px" } },
                      r.a.createElement(fe, o)
                    ),
                    r.a.createElement(
                      be.a,
                      { style: { padding: "12px" } },
                      r.a.createElement(ge, {
                        promptsInfo: l,
                        value: this.state.option,
                        onChange: this.handleOptionChanged,
                        onPromptSubmit: this.onPromptSubmit
                      })
                    ),
                    r.a.createElement(
                      be.a,
                      { style: { padding: "12px" } },
                      r.a.createElement(S.a, { onClick: a }, "End Turn"),
                      r.a.createElement(S.a, { onClick: n }, "Forfeit")
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        fe = function(e) {
          var t = e.turnCount,
            a = e.currentPlayer,
            n = e.cardsPlayed,
            o = e.deckCount;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement("p", null, "Turn: ", t),
            r.a.createElement("p", null, "Current Player: ", a),
            r.a.createElement("p", null, "Cards Played: ", n),
            r.a.createElement("p", null, "Deck Count: ", o)
          );
        },
        ge = function(e) {
          var t = e.promptsInfo,
            a = e.value,
            n = e.onChange,
            o = e.onPromptSubmit;
          return r.a.createElement(
            r.a.Fragment,
            null,
            r.a.createElement("p", null, "Prompt"),
            r.a.createElement("p", null, t.promptMessage),
            r.a.createElement("p", null, t.promptPlayer.id),
            r.a.createElement(
              "form",
              { onSubmit: o },
              r.a.createElement(
                L.Field,
                null,
                r.a.createElement(L.Label, null, "Options:"),
                t.options
                  ? r.a.createElement(
                      L.Select,
                      { value: a, onChange: n },
                      t.options.map(function(e, t) {
                        return r.a.createElement(
                          "option",
                          { key: t, value: t },
                          e
                        );
                      })
                    )
                  : r.a.createElement("input", { onChange: n }),
                r.a.createElement(
                  L.Field,
                  null,
                  r.a.createElement(
                    L.Control,
                    null,
                    r.a.createElement(
                      S.a,
                      { className: "is-info is-fullwidth" },
                      "Send"
                    )
                  )
                )
              )
            )
          );
        },
        ye = he,
        Ee = (function(e) {
          function t() {
            var e, a;
            Object(c.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(s.a)(
                this,
                (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
              )).state = { activeHandCard: null }),
              (a.handleHandCardClicked = function(e) {
                a.setState({ activeHandCard: e });
              }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  var e = this.state.activeHandCard,
                    t = this.props,
                    a = t.userId,
                    n = t.gameId,
                    o = t.data,
                    l = o.general_info,
                    c = o.prompts_info,
                    i = o.players_info,
                    s = t.onPromptSubmit,
                    m = t.onEndTurn,
                    u = t.onForfeit,
                    d = l.discard.length
                      ? l.discard[l.discard.length - 1]
                      : void 0;
                  return r.a.createElement(
                    C.a,
                    null,
                    r.a.createElement(
                      C.a.Column,
                      { size: 10 },
                      r.a.createElement(de, {
                        userId: a,
                        lastDiscard: d,
                        playersInfo: i,
                        onHandCardClicked: this.handleHandCardClicked
                      })
                    ),
                    r.a.createElement(
                      C.a.Column,
                      { size: 2 },
                      r.a.createElement(ye, {
                        activeHandCard: e,
                        generalInfo: l,
                        promptsInfo: c,
                        onPromptSubmit: s,
                        onEndTurn: m,
                        onForfeit: u
                      }),
                      r.a.createElement(R, { gameId: n })
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        ve = (a(205),
        a(207),
        [
          {
            path: "/game/:id",
            exact: !0,
            component: (function(e) {
              function t(e) {
                var a;
                Object(c.a)(this, t),
                  ((a = Object(s.a)(
                    this,
                    Object(m.a)(t).call(this, e)
                  )).componentDidMount = function() {
                    P.Game.getGame(a.props.match.params.id).then(function(e) {
                      e.ok
                        ? e.text().then(function(e) {
                            (e = JSON.parse(e)),
                              a.setState({
                                userId: e.id,
                                userName: e.name,
                                host: e.host,
                                load: !1
                              });
                          })
                        : (window.location = "/login");
                    });
                  }),
                  (a.onGameUpdate = function(e) {
                    e && a.setState({ data: e });
                  }),
                  (a.onGameForfeit = function(e) {
                    Object(d.toast)(e);
                  }),
                  (a.onStartGame = function(e) {
                    P.Game.postGameStartGame(a.props.match.params.id).then(
                      function(e) {
                        return P.Game.postGameUpdate(a.props.match.params.id);
                      }
                    );
                  }),
                  (a.onStartGameNotifyAll = function(e) {
                    a.setState({ startGame: !0 });
                  }),
                  (a.handlePromptSubmit = function(e) {
                    P.Game.postGameClick(a.props.match.params.id, e);
                  }),
                  (a.handleForfeit = function(e) {
                    P.Game.postGameForfeit(a.props.match.params.id),
                      (window.location = "/main-lobby");
                  }),
                  (a.handleEndTurn = function(e) {
                    P.Game.postGameEndTurn(a.props.match.params.id);
                  }),
                  (a.state = {
                    userId: null,
                    userName: null,
                    gameSocket: P.socket,
                    host: !1,
                    startGame: !1,
                    load: !0,
                    data: null
                  });
                var n = a.props.match.params.id;
                return (
                  P.Game.postGameJoin(n),
                  P.socket.on(
                    "game:".concat(n, ":start-game"),
                    a.onStartGameNotifyAll
                  ),
                  P.socket.on(
                    "game:".concat(n, ":game-update"),
                    a.onGameUpdate
                  ),
                  P.socket.on(
                    "game:".concat(n, ":game-forfeit"),
                    a.onGameForfeit
                  ),
                  (a.onStartGame = a.onStartGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onGameUpdate = a.onGameUpdate.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.handleEndTurn = a.handleEndTurn.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.handleForfeit = a.handleForfeit.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  a
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "render",
                    value: function() {
                      var e = this.props.match.params.id,
                        t = this.state,
                        a = t.userId,
                        n = t.startGame,
                        o = t.load,
                        l = t.host,
                        c = t.data;
                      return o
                        ? r.a.createElement("div", null, "Loading...")
                        : n && c
                        ? r.a.createElement(Ee, {
                            userId: a,
                            gameId: e,
                            data: c,
                            onPromptSubmit: this.handlePromptSubmit,
                            onEndTurn: this.handleEndTurn,
                            onForfeit: this.handleForfeit
                          })
                        : l
                        ? r.a.createElement(
                            j.a,
                            null,
                            r.a.createElement(
                              S.a,
                              { onClick: this.onStartGame },
                              "Start Game"
                            )
                          )
                        : r.a.createElement(
                            j.a,
                            null,
                            r.a.createElement(
                              C.a,
                              { className: "is-centered" },
                              r.a.createElement(
                                C.a.Column,
                                { size: 2 },
                                r.a.createElement(
                                  S.a,
                                  { onClick: this.onStartGame },
                                  "Waiting for host to start game..."
                                )
                              )
                            )
                          );
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ]),
        Ce = a(34),
        Oe = a.n(Ce),
        je = a(26),
        ke = a.n(je),
        Se = a(21),
        we = a.n(Se),
        Ge = a(74),
        Ie = a.n(Ge),
        Le = function(e) {
          var t = e.title,
            a = e.userName;
          return r.a.createElement(
            we.a,
            null,
            r.a.createElement(
              we.a.Brand,
              null,
              r.a.createElement(
                we.a.Item,
                { className: "is-paddingless", renderAs: "a", href: "/login" },
                r.a.createElement("img", { src: Ie.a, alt: "logo" })
              )
            ),
            r.a.createElement(
              we.a.Menu,
              null,
              r.a.createElement(
                we.a.Container,
                null,
                r.a.createElement(we.a.Item, { href: "#" }, "Dealiooo")
              ),
              r.a.createElement(
                we.a.Container,
                null,
                r.a.createElement(
                  we.a.Item,
                  { renderAs: "div" },
                  r.a.createElement(ke.a, { size: 3 }, t)
                )
              ),
              r.a.createElement(
                we.a.Container,
                { position: "end" },
                r.a.createElement(
                  we.a.Item,
                  { renderAs: "div", className: "has-dropdown is-hoverable" },
                  r.a.createElement(we.a.Link, null, a),
                  r.a.createElement(
                    we.a.Dropdown,
                    { className: "is-right" },
                    r.a.createElement(
                      we.a.Item,
                      {
                        value: "item",
                        onClick: function() {
                          P.Auth.postLogout().then(function(e) {
                            e.error && console.log("error on logout"),
                              e.ok && (window.location = "/login");
                          });
                        }
                      },
                      "Logout"
                    )
                  )
                )
              )
            )
          );
        },
        Ne = a(35),
        xe = a.n(Ne),
        Pe = (function(e) {
          function t() {
            return (
              Object(c.a)(this, t),
              Object(s.a)(this, Object(m.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  if (this.props.status) {
                    var e = r.a.createElement(
                      xe.a.Group,
                      null,
                      this.props.status.map(function(e, t) {
                        return r.a.createElement(
                          xe.a,
                          { key: t },
                          "[",
                          e.id,
                          "]",
                          e.name,
                          " -",
                          " ",
                          e.ready ? "Ready" : "Not Ready"
                        );
                      })
                    );
                    return r.a.createElement(
                      j.a,
                      null,
                      r.a.createElement(
                        C.a,
                        null,
                        r.a.createElement(C.a.Column, null, e)
                      )
                    );
                  }
                  return r.a.createElement(
                    j.a,
                    null,
                    "Loading Player Status..."
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        Re = (a(234),
        [
          {
            path: "/game-lobby/:id",
            exact: !0,
            component: (function(e) {
              function t(e) {
                var a;
                Object(c.a)(this, t),
                  ((a = Object(s.a)(
                    this,
                    Object(m.a)(t).call(this, e)
                  )).onEnterGame = a.onEnterGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onLeaveGame = a.onLeaveGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onPlayerReady = a.onPlayerReady.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onPlayerUnready = a.onPlayerUnready.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onStartGame = a.onStartGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onStart = a.onStart.bind(Object(E.a)(Object(E.a)(a)))),
                  (a.onReady = a.onReady.bind(Object(E.a)(Object(E.a)(a)))),
                  (a.onExit = a.onExit.bind(Object(E.a)(Object(E.a)(a))));
                var n = a.props.match.params.id;
                return (
                  (a.state = {
                    gameId: n,
                    lobbyName: "".concat(n, "'s Lobby"),
                    startRender: !1,
                    host: !1,
                    userId: null,
                    userName: null,
                    playersStatus: null,
                    socket: P.socket
                  }),
                  P.GameLobby.postGameLobbyEnter(n),
                  P.socket.on(
                    "game-lobby:".concat(n, ":enter-game"),
                    a.onEnterGame
                  ),
                  P.socket.on(
                    "game-lobby:".concat(n, ":leave-game"),
                    a.onLeaveGame
                  ),
                  P.socket.on(
                    "game-lobby:".concat(n, ":player-ready"),
                    a.onPlayerReady
                  ),
                  P.socket.on(
                    "game-lobby:".concat(n, ":player-unready"),
                    a.onPlayerUnready
                  ),
                  P.socket.on(
                    "game-lobby:".concat(n, ":start-game"),
                    a.onStartGame
                  ),
                  a
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "componentDidMount",
                    value: function() {
                      var e = this;
                      P.GameLobby.getGameLobby(this.state.gameId).then(function(
                        t
                      ) {
                        t.ok
                          ? t.text().then(function(t) {
                              (t = JSON.parse(t)),
                                e.setState({ userId: t.id }),
                                e.setState({ userName: t.name }),
                                P.GameLobby.getGameLobbyPlayersStatus(
                                  e.state.gameId
                                ).then(function(t) {
                                  t.result.map(function(t) {
                                    return (
                                      e.state.userId === t.id &&
                                        e.setState({ host: t.Players[0].host }),
                                      (t.ready = t.Players[0].ready)
                                    );
                                  }),
                                    e.setState({ playersStatus: t.result }),
                                    e.setState({ startRender: !0 });
                                });
                            })
                          : (window.location = "/main-lobby");
                      });
                    }
                  },
                  {
                    key: "onEnterGame",
                    value: function(e) {
                      var t = this;
                      this.state.gameId === e &&
                        P.GameLobby.getGameLobbyPlayersStatus(
                          this.state.gameId
                        ).then(function(e) {
                          e.result.map(function(e) {
                            return (e.ready = e.Players[0].ready);
                          }),
                            t.setState({ players_status: e.result });
                        });
                    }
                  },
                  {
                    key: "onLeaveGame",
                    value: function(e) {
                      if (this.state.gameId === e.gameId) {
                        var t = this.state.playersStatus;
                        this.setState({
                          playersStatus: t.filter(function(t) {
                            return t.id !== e.userId;
                          })
                        }),
                          this.state.userId === e.userId &&
                            (window.location = "/main-lobby");
                      }
                    }
                  },
                  {
                    key: "onPlayerReady",
                    value: function(e) {
                      for (
                        var t = this.state.playersStatus, a = t.length, n = 0;
                        n < a;
                        n++
                      )
                        t[n].id === e.userId && (t[n].ready = !0);
                      this.setState({ playerStatus: t });
                    }
                  },
                  {
                    key: "onPlayerUnready",
                    value: function(e) {
                      for (
                        var t = this.state.playersStatus, a = t.length, n = 0;
                        n < a;
                        n++
                      )
                        t[n].id === e.userId && (t[n].ready = !1);
                      this.setState({ playerStatus: t });
                    }
                  },
                  {
                    key: "onStartGame",
                    value: function(e) {
                      window.location = "/game/".concat(this.state.gameId);
                    }
                  },
                  {
                    key: "onStart",
                    value: function(e) {
                      P.GameLobby.postGameLobbyStart(this.state.gameId).then(
                        function(e) {
                          e.message && Object(d.toast)(e.message);
                        }
                      );
                    }
                  },
                  {
                    key: "onReady",
                    value: function(e) {
                      P.GameLobby.postGameLobbyTogglePlayerReady(
                        this.state.gameId
                      ).then(function(e) {});
                    }
                  },
                  {
                    key: "onExit",
                    value: function(e) {
                      P.GameLobby.postGameLobbyLeave(this.state.gameId).then(
                        function(e) {
                          return (window.location = "/main-lobby");
                        }
                      );
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      return this.state.startRender
                        ? r.a.createElement(
                            "div",
                            null,
                            r.a.createElement(Le, {
                              title: this.state.lobbyName,
                              userName: this.state.userName
                            }),
                            r.a.createElement(
                              C.a,
                              null,
                              r.a.createElement(
                                C.a.Column,
                                null,
                                r.a.createElement(
                                  j.a,
                                  { className: "has-background-grey-lighter" },
                                  r.a.createElement(
                                    be.a,
                                    null,
                                    r.a.createElement(
                                      C.a,
                                      null,
                                      r.a.createElement(
                                        C.a.Column,
                                        null,
                                        r.a.createElement(
                                          Oe.a,
                                          null,
                                          r.a.createElement(
                                            Oe.a.Head,
                                            null,
                                            r.a.createElement(
                                              g.a,
                                              null,
                                              r.a.createElement(
                                                ke.a,
                                                null,
                                                this.state.lobbyName
                                              )
                                            )
                                          )
                                        ),
                                        r.a.createElement(Pe, {
                                          status: this.state.playersStatus
                                        }),
                                        r.a.createElement(
                                          be.a,
                                          null,
                                          r.a.createElement(
                                            _.a,
                                            null,
                                            r.a.createElement(
                                              _.a.Item,
                                              null,
                                              this.state.host
                                                ? r.a.createElement(
                                                    S.a,
                                                    { onClick: this.onStart },
                                                    "Start"
                                                  )
                                                : r.a.createElement("div", null)
                                            ),
                                            r.a.createElement(
                                              _.a.Item,
                                              null,
                                              r.a.createElement(
                                                S.a,
                                                { onClick: this.onReady },
                                                "Ready"
                                              )
                                            ),
                                            r.a.createElement(
                                              _.a.Item,
                                              null,
                                              r.a.createElement(
                                                S.a,
                                                { onClick: this.onExit },
                                                "Exit"
                                              )
                                            ),
                                            r.a.createElement(_.a.Item, null)
                                          )
                                        )
                                      ),
                                      r.a.createElement(
                                        C.a.Column,
                                        {
                                          size: "5",
                                          className: "game-lobby-chat"
                                        },
                                        r.a.createElement(x, {
                                          socket: this.state.socket,
                                          api: P.GameLobby.postGameLobbyChat,
                                          channel: "game-lobby:".concat(
                                            this.state.gameId,
                                            ":chat"
                                          ),
                                          roomId: this.state.gameId
                                        })
                                      )
                                    )
                                  ),
                                  r.a.createElement(
                                    be.a,
                                    null,
                                    r.a.createElement(
                                      _.a,
                                      null,
                                      r.a.createElement(
                                        _.a.Item,
                                        null,
                                        this.state.host
                                          ? r.a.createElement(
                                              S.a,
                                              { onClick: this.onStart },
                                              "Start"
                                            )
                                          : r.a.createElement("div", null)
                                      ),
                                      r.a.createElement(
                                        _.a.Item,
                                        null,
                                        r.a.createElement(
                                          S.a,
                                          { onClick: this.onReady },
                                          "Ready"
                                        )
                                      ),
                                      r.a.createElement(
                                        _.a.Item,
                                        null,
                                        r.a.createElement(
                                          S.a,
                                          { onClick: this.onExit },
                                          "Exit"
                                        )
                                      ),
                                      r.a.createElement(_.a.Item, null)
                                    )
                                  )
                                )
                              )
                            )
                          )
                        : r.a.createElement(j.a, null, "Loading Page...");
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ]),
        Fe = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(m.a)(t).call(this, e)
              )).onEnter = a.onEnter.bind(Object(E.a)(Object(E.a)(a)))),
              (a.onJoin = a.onJoin.bind(Object(E.a)(Object(E.a)(a)))),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "onEnter",
                value: function(e) {
                  window.location = "/game-lobby/".concat(this.props.gameId);
                }
              },
              {
                key: "onJoin",
                value: function(e) {
                  var t = this;
                  P.GameLobby.postGameLobbyJoin(this.props.gameId).then(
                    function(e) {
                      e.result &&
                        (window.location = "/game-lobby/".concat(
                          t.props.gameId
                        ));
                    }
                  );
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this;
                  if (this.props.gameLobby.playerList) {
                    var t,
                      a = !1,
                      n = r.a.createElement(
                        xe.a.Group,
                        null,
                        this.props.gameLobby.playerList.map(function(t, n) {
                          return (
                            e.props.userId === t.id && (a = !0),
                            r.a.createElement(
                              xe.a,
                              null,
                              "[",
                              t.id,
                              "]",
                              t.name
                            )
                          );
                        })
                      );
                    return (
                      (t = a
                        ? r.a.createElement(
                            S.a,
                            {
                              className: "is-fullwidth",
                              onClick: this.onEnter
                            },
                            "Enter"
                          )
                        : r.a.createElement(
                            S.a,
                            { className: "is-fullwidth", onClick: this.onJoin },
                            "Join"
                          )),
                      r.a.createElement(
                        j.a,
                        null,
                        r.a.createElement(
                          C.a,
                          null,
                          r.a.createElement(
                            C.a.Column,
                            null,
                            r.a.createElement(
                              "p",
                              null,
                              "#",
                              this.props.gameLobby.id,
                              " ",
                              this.props.gameLobby.roomName,
                              " (",
                              this.props.gameLobby.playerNum,
                              " /",
                              " ",
                              this.props.gameLobby.playerCap,
                              ")"
                            )
                          ),
                          r.a.createElement(C.a.Column, null, n),
                          r.a.createElement(C.a.Column, null, t)
                        )
                      )
                    );
                  }
                  return r.a.createElement(
                    j.a,
                    null,
                    "Loading Lobby #",
                    this.props.gameLobby.id,
                    "'s info"
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        _e = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(m.a)(t).call(this, e)
              )).componentWillReceiveProps = function(e) {
                a.setState({
                  roomName: e.roomName,
                  playerCapacity: e.playerCapacity
                });
              }),
              (a.open = function() {
                return a.setState({ show: !0 });
              }),
              (a.close = function() {
                return a.setState({ show: !1 });
              }),
              (a.render = function() {
                return r.a.createElement(
                  "div",
                  null,
                  r.a.createElement(
                    re.a,
                    { show: a.state.show, onClose: a.close },
                    r.a.createElement(
                      "form",
                      { onSubmit: a.props.onCreate },
                      r.a.createElement(
                        L.Label,
                        { className: "is-size-4" },
                        "Choose Player Capacity:"
                      ),
                      r.a.createElement(
                        L.Field,
                        { className: "is-grouped" },
                        r.a.createElement(
                          L.Control,
                          null,
                          r.a.createElement(L.Input, {
                            name: "roomName",
                            type: "text",
                            onChange: a.props.onChange,
                            placeholder: "Room Name",
                            value: a.state.roomName
                          })
                        ),
                        r.a.createElement(
                          L.Select,
                          {
                            name: "playerCapacity",
                            onChange: a.props.onChange,
                            value: a.state.playerCapacity
                          },
                          r.a.createElement("option", { value: 2 }, "2"),
                          r.a.createElement("option", { value: 3 }, "3"),
                          r.a.createElement("option", { value: 4 }, "4"),
                          r.a.createElement("option", { value: 5 }, "5")
                        ),
                        r.a.createElement(
                          L.Control,
                          null,
                          r.a.createElement(
                            S.a,
                            { className: "is-info", type: "submit" },
                            "Create"
                          )
                        )
                      )
                    )
                  ),
                  r.a.createElement(S.a, { onClick: a.open }, "Make a Room")
                );
              }),
              (a.state = {
                show: !1,
                roomName: a.props.roomName,
                playerCapacity: a.props.playerCapacity
              }),
              (a.open = a.open.bind(Object(E.a)(Object(E.a)(a)))),
              (a.close = a.close.bind(Object(E.a)(Object(E.a)(a)))),
              a
            );
          }
          return Object(u.a)(t, e), t;
        })(n.Component),
        Me = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(s.a)(
                this,
                Object(m.a)(t).call(this, e)
              )).componentWillReceiveProps = function(e) {
                a.setState({
                  roomName: e.roomName,
                  playerCapacity: e.playerCapacity
                });
              }),
              (a.componentDidMount = function() {
                a.ps = new w.a(l.a.findDOMNode(Object(E.a)(Object(E.a)(a))));
              }),
              (a.componentDidUpdate = function(e) {
                a.ps.update();
              }),
              (a.render = function() {
                var e;
                return (
                  a.props.gameLobbies &&
                    (e = a.props.gameLobbies.map(function(e) {
                      return r.a.createElement(Fe, {
                        key: e.id,
                        gameLobby: e,
                        userId: a.props.userId,
                        gameId: e.id
                      });
                    })),
                  r.a.createElement(
                    j.a,
                    null,
                    r.a.createElement(_e, {
                      roomName: a.state.roomName,
                      playerCapacity: a.state.playerCapacity,
                      onCreate: a.props.onCreate,
                      onChange: a.props.onChange
                    }),
                    e
                  )
                );
              }),
              (a.state = {
                roomName: a.props.roomName,
                playerCapacity: a.props.playerCapacity
              }),
              a
            );
          }
          return Object(u.a)(t, e), t;
        })(n.Component),
        De = (a(236),
        [
          {
            path: "/main-lobby",
            exact: !0,
            component: (function(e) {
              function t(e) {
                var a;
                return (
                  Object(c.a)(this, t),
                  ((a = Object(s.a)(
                    this,
                    Object(m.a)(t).call(this, e)
                  )).componentDidMount = function() {
                    P.MainLobby.getMainLobby().then(function(e) {
                      e.ok
                        ? e.text().then(function(e) {
                            (e = JSON.parse(e)),
                              a.setState({ userId: e.id }),
                              a.setState({ userName: e.name }),
                              a.setState({ startRender: !0 }),
                              P.MainLobby.postMainLobby().then(function(e) {
                                var t = e.result;
                                t.map(function(e, n) {
                                  return P.GameLobby.getGameLobbyInfo(
                                    e.id
                                  ).then(function(r) {
                                    (t[n].id = e.id),
                                      (t[n].playerList = r.result),
                                      (t[n].playerNum = r.result.length),
                                      (t[n].roomName = e.room_name),
                                      (t[n].playerCap = e.player_cap),
                                      (t[n].status = e.status),
                                      a.setState({ lobbies: t });
                                  });
                                });
                              });
                          })
                        : (window.location = "/login");
                    });
                  }),
                  (a.onCreateGame = function(e) {
                    var t = a.state.lobbies,
                      n = {
                        id: e.gameId,
                        roomName: e.roomName,
                        playerCap: e.playerCap,
                        status: "open"
                      };
                    P.GameLobby.getGameLobbyInfo(e.gameId).then(function(e) {
                      (n.playerList = e.result),
                        (n.playerNum = e.result.length),
                        (t = t.concat(n)),
                        a.setState({ lobbies: t });
                    });
                  }),
                  (a.onEndGame = function(e) {}),
                  (a.onJoinGame = function(e) {
                    for (
                      var t = a.state.lobbies.length, n = 0, r = 0;
                      r < t;
                      r++
                    )
                      if (a.state.lobbies[r].id === e.gameId) {
                        n = r;
                        break;
                      }
                    P.GameLobby.getGameLobbyInfo(e.gameId).then(function(e) {
                      var t = a.state.lobbies;
                      (t[n].playerList = e.result),
                        (t[n].playerNum = e.result.length),
                        a.setState({ lobbies: t });
                    });
                  }),
                  (a.onLeaveGame = function(e) {
                    for (
                      var t = a.state.lobbies.length, n = 0, r = 0;
                      r < t;
                      r++
                    )
                      if (a.state.lobbies[r].id === parseInt(e.gameId)) {
                        n = r;
                        break;
                      }
                    P.GameLobby.getGameLobbyInfo(e.gameId).then(function(e) {
                      var t = a.state.lobbies;
                      e.result.length
                        ? ((t[n].playerList = e.result),
                          (t[n].playerNum = e.result.length))
                        : t.splice(n, 1),
                        a.setState({ lobbies: t });
                    });
                  }),
                  (a.onStartGame = function(e) {
                    for (
                      var t = a.state.lobbies.length, n = 0, r = 0;
                      r < t;
                      r++
                    )
                      if (a.state.lobbies[r].id === parseInt(e.gameId)) {
                        n = r;
                        break;
                      }
                    var o = a.state.lobbies;
                    o.splice(n, 1), a.setState({ lobbies: o });
                  }),
                  (a.onCreate = function(e) {
                    e.preventDefault(),
                      P.MainLobby.postMainLobbyCreateGame(
                        a.state.roomName,
                        a.state.playerCapacity
                      ).then(function(e) {
                        window.location = "/game-lobby/".concat(e.th_game_id);
                      });
                  }),
                  (a.onChange = function(e) {
                    a.setState(Object(I.a)({}, e.target.name, e.target.value));
                  }),
                  (a.render = function() {
                    return a.state.startRender
                      ? r.a.createElement(
                          "div",
                          null,
                          r.a.createElement(Le, {
                            title: "Main Lobby",
                            userName: a.state.userName
                          }),
                          r.a.createElement(
                            be.a,
                            null,
                            r.a.createElement(
                              C.a,
                              null,
                              r.a.createElement(
                                C.a.Column,
                                null,
                                r.a.createElement(Me, {
                                  key: "gameLobbies",
                                  gameLobbies: a.state.lobbies,
                                  userId: a.state.userId,
                                  roomName: a.state.roomName,
                                  playerCapacity: a.state.playerCapacity,
                                  onCreate: a.onCreate,
                                  onChange: a.onChange
                                })
                              ),
                              r.a.createElement(
                                C.a.Column,
                                { className: "main-lobby-chat is-two-fifths" },
                                r.a.createElement(x, {
                                  socket: a.state.socket,
                                  api: P.MainLobby.postMainLobbyChat,
                                  channel: "main-lobby:chat",
                                  roomId: null
                                })
                              )
                            )
                          )
                        )
                      : r.a.createElement(j.a, null, "Loading Page...");
                  }),
                  (a.onCreateGame = a.onCreateGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onEndGame = a.onEndGame.bind(Object(E.a)(Object(E.a)(a)))),
                  (a.onJoinGame = a.onJoinGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onLeaveGame = a.onLeaveGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onStartGame = a.onStartGame.bind(
                    Object(E.a)(Object(E.a)(a))
                  )),
                  (a.onCreate = a.onCreate.bind(Object(E.a)(Object(E.a)(a)))),
                  (a.onChange = a.onChange.bind(Object(E.a)(Object(E.a)(a)))),
                  (a.state = {
                    startRender: !1,
                    playerCapacity: 2,
                    userId: null,
                    userName: null,
                    lobbies: [],
                    socket: P.socket,
                    roomName: ""
                  }),
                  P.socket.on("main-lobby:create-game", a.onCreateGame),
                  P.socket.on("main-lobby:end-game", a.onEndGame),
                  P.socket.on("main-lobby:join-game", a.onJoinGame),
                  P.socket.on("main-lobby:leave-game", a.onLeaveGame),
                  P.socket.on("main-lobby:start-game", a.onStartGame),
                  a
                );
              }
              return Object(u.a)(t, e), t;
            })(n.Component)
          }
        ]),
        Te = [
          {
            exact: !1,
            component: (function(e) {
              function t() {
                return (
                  Object(c.a)(this, t),
                  Object(s.a)(this, Object(m.a)(t).apply(this, arguments))
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "render",
                    value: function() {
                      return r.a.createElement("div", null, "404");
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ],
        Ae = a(53),
        He = a.n(Ae),
        ze = a(30),
        Je = a.n(ze),
        Ue = a(75),
        We = a.n(Ue),
        qe = (a(238),
        function() {
          return r.a.createElement(
            Oe.a,
            { className: "is-small" },
            r.a.createElement(
              Oe.a.Body,
              null,
              r.a.createElement(
                Je.a,
                { className: "is-centered" },
                r.a.createElement(
                  Je.a.Column,
                  { className: "is-centered imgSize", offset: null },
                  r.a.createElement(
                    "div",
                    { style: { width: 300 } },
                    r.a.createElement(z.a, {
                      className: "is-centered",
                      src: We.a
                    })
                  )
                )
              )
            )
          );
        }),
        Be = [
          {
            path: "/register",
            exact: !0,
            component: (function(e) {
              function t() {
                var e, a;
                Object(c.a)(this, t);
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((a = Object(s.a)(
                    this,
                    (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
                  )).state = {
                    name: "",
                    email: "",
                    password: "",
                    error_message: null
                  }),
                  (a.onChange = function(e) {
                    a.setState(Object(I.a)({}, e.target.name, e.target.value));
                  }),
                  (a.onSubmit = function(e) {
                    e.preventDefault(),
                      P.Auth.postRegister(
                        a.state.name,
                        a.state.email,
                        a.state.password
                      ).then(function(e) {
                        e.error
                          ? a.setState({
                              error_message: e.error.errors[0].message
                            })
                          : (window.location = "/main-lobby");
                      });
                  }),
                  a
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "componentWillMount",
                    value: function() {
                      P.Auth.getRegister().then(function(e) {
                        e.ok || (window.location = "/main-lobby");
                      });
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      return r.a.createElement(
                        He.a,
                        { className: "is-fullhd" },
                        r.a.createElement(qe, null),
                        r.a.createElement(
                          be.a,
                          null,
                          r.a.createElement(
                            Je.a,
                            { className: "is-centered" },
                            r.a.createElement(
                              Je.a.Column,
                              { size: 4 },
                              r.a.createElement(
                                j.a,
                                null,
                                r.a.createElement(
                                  "form",
                                  { onSubmit: this.onSubmit },
                                  r.a.createElement(
                                    ke.a,
                                    {
                                      className:
                                        "has-text-centered has-text-black"
                                    },
                                    "Register"
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      { className: "control-padding-vertical" },
                                      r.a.createElement(L.Input, {
                                        name: "name",
                                        type: "text",
                                        onChange: this.onChange,
                                        value: this.state.name,
                                        placeholder: "Enter a name"
                                      })
                                    )
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(L.Input, {
                                        name: "email",
                                        type: "email",
                                        onChange: this.onChange,
                                        value: this.state.email,
                                        placeholder: "Enter a email"
                                      })
                                    )
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(L.Input, {
                                        name: "password",
                                        type: "password",
                                        onChange: this.onChange,
                                        value: this.state.password,
                                        placeholder: "Enter a Password"
                                      })
                                    )
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(
                                        S.a,
                                        { className: "is-fullwidth" },
                                        "Register"
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      );
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ],
        Ve = [
          {
            path: "/login",
            exact: !0,
            component: (function(e) {
              function t() {
                var e, a;
                Object(c.a)(this, t);
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((a = Object(s.a)(
                    this,
                    (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
                  )).state = { email: "", password: "", error_message: "" }),
                  (a.onChange = function(e) {
                    a.setState(Object(I.a)({}, e.target.name, e.target.value));
                  }),
                  (a.onSubmit = function(e) {
                    e.preventDefault(),
                      P.Auth.postLogin(a.state.email, a.state.password).then(
                        function(e) {
                          e.error
                            ? a.setState({
                                error_message:
                                  "Invalid email & password combination"
                              })
                            : (window.location = "/main-lobby");
                        }
                      );
                  }),
                  a
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "componentWillMount",
                    value: function() {
                      P.Auth.getLogin().then(function(e) {
                        e.ok || (window.location = "/main-lobby");
                      });
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      var e = this.state,
                        t = e.email,
                        a = e.password,
                        n = e.error_message;
                      return r.a.createElement(
                        g.a,
                        { fluid: !0 },
                        r.a.createElement(qe, null),
                        r.a.createElement(
                          be.a,
                          null,
                          r.a.createElement(
                            Je.a,
                            { className: "is-centered" },
                            r.a.createElement(
                              Je.a.Column,
                              { size: 4 },
                              n
                                ? r.a.createElement(
                                    "div",
                                    { className: "has-text-danger" },
                                    n
                                  )
                                : null,
                              r.a.createElement(
                                j.a,
                                null,
                                r.a.createElement(
                                  "form",
                                  { onSubmit: this.onSubmit },
                                  r.a.createElement(
                                    ke.a,
                                    { className: "has-text-centered" },
                                    "Login"
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(L.Input, {
                                        name: "email",
                                        type: "email",
                                        onChange: this.onChange,
                                        value: t,
                                        placeholder: "Email"
                                      })
                                    )
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(L.Input, {
                                        name: "password",
                                        type: "password",
                                        onChange: this.onChange,
                                        value: a,
                                        placeholder: "Password"
                                      })
                                    )
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(
                                        S.a,
                                        { className: "is-fullwidth" },
                                        "Login"
                                      )
                                    )
                                  ),
                                  r.a.createElement(
                                    "div",
                                    { className: "has-text-right" },
                                    r.a.createElement(
                                      "a",
                                      { href: "/register" },
                                      "Register"
                                    ),
                                    "\xa0|\xa0",
                                    r.a.createElement(
                                      "a",
                                      { href: "/forgot-password" },
                                      "Forgot Password?"
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      );
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ],
        Ke = [
          {
            path: "/forgot-password",
            exact: !0,
            component: (function(e) {
              function t() {
                var e, a;
                Object(c.a)(this, t);
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((a = Object(s.a)(
                    this,
                    (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
                  )).state = { email: "", error_message: null }),
                  (a.onChange = function(e) {
                    a.setState(Object(I.a)({}, e.target.name, e.target.value));
                  }),
                  (a.onSubmit = function(e) {
                    e.preventDefault(),
                      P.Auth.postForgotPassword(a.state.email).then(function(
                        e
                      ) {
                        e.error
                          ? a.setState({ error_message: "Invalid email" })
                          : (window.location = "/");
                      });
                  }),
                  a
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "render",
                    value: function() {
                      var e = this.state,
                        t = e.email,
                        a = e.error_message;
                      return r.a.createElement(
                        g.a,
                        { fluid: !0 },
                        r.a.createElement(qe, null),
                        r.a.createElement(
                          be.a,
                          null,
                          a
                            ? r.a.createElement(
                                "div",
                                { className: "has-text-danger" },
                                a
                              )
                            : null,
                          r.a.createElement(
                            "form",
                            { onSubmit: this.onSubmit },
                            r.a.createElement(
                              C.a,
                              { className: "is-centered" },
                              r.a.createElement(
                                C.a.Column,
                                { size: 4 },
                                r.a.createElement(
                                  j.a,
                                  null,
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      ke.a,
                                      {
                                        className:
                                          "has-text-centered has-text-black"
                                      },
                                      "Forgot Password"
                                    ),
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(L.Input, {
                                        name: "email",
                                        type: "email",
                                        onChange: this.onChange,
                                        placeholder: "Email",
                                        value: t
                                      })
                                    )
                                  ),
                                  r.a.createElement(
                                    L.Field,
                                    null,
                                    r.a.createElement(
                                      L.Control,
                                      null,
                                      r.a.createElement(
                                        S.a,
                                        { className: "is-fullwidth" },
                                        "Submit"
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      );
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ],
        Qe = [
          {
            path: "/new-password/:sid",
            exact: !0,
            component: (function(e) {
              function t() {
                var e, a;
                Object(c.a)(this, t);
                for (
                  var n = arguments.length, r = new Array(n), o = 0;
                  o < n;
                  o++
                )
                  r[o] = arguments[o];
                return (
                  ((a = Object(s.a)(
                    this,
                    (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
                  )).state = {
                    isLoading: !1,
                    password: "",
                    error_message: null
                  }),
                  (a.onChange = function(e) {
                    a.setState(Object(I.a)({}, e.target.name, e.target.value));
                  }),
                  (a.onSubmit = function(e) {
                    e.preventDefault();
                    var t = a.props.match.params.sid;
                    P.Auth.postNewPassword(t, a.state.password).then(function(
                      e
                    ) {
                      e.ok
                        ? (window.location = "/")
                        : a.setState({ error_message: "Something went wrong" });
                    });
                  }),
                  a
                );
              }
              return (
                Object(u.a)(t, e),
                Object(i.a)(t, [
                  {
                    key: "componentDidMount",
                    value: function() {
                      var e = this;
                      this.setState({ isLoading: !0 });
                      var t = this.props.match.params.sid;
                      console.log(t),
                        P.Auth.getNewPassword(t).then(function(t) {
                          t.ok || (window.location = "/login"),
                            e.setState({ isLoading: !1 });
                        });
                    }
                  },
                  {
                    key: "render",
                    value: function() {
                      var e = this.state,
                        t = e.isLoading,
                        a = e.password,
                        n = e.error_message;
                      return t
                        ? r.a.createElement(r.a.Fragment, null, "...Loading")
                        : r.a.createElement(
                            g.a,
                            { fluid: !0 },
                            r.a.createElement(qe, null),
                            r.a.createElement(
                              be.a,
                              null,
                              n
                                ? r.a.createElement(
                                    "div",
                                    { className: "has-text-danger" },
                                    n
                                  )
                                : null,
                              r.a.createElement(
                                C.a,
                                { className: "is-centered" },
                                r.a.createElement(
                                  C.a.Column,
                                  { size: 4 },
                                  r.a.createElement(
                                    j.a,
                                    null,
                                    r.a.createElement(
                                      "form",
                                      { onSubmit: this.onSubmit },
                                      r.a.createElement(
                                        L.Field,
                                        null,
                                        r.a.createElement(
                                          ke.a,
                                          {
                                            className:
                                              "has-text-centered has-text-black"
                                          },
                                          "New Password"
                                        ),
                                        r.a.createElement(
                                          L.Control,
                                          null,
                                          r.a.createElement(L.Input, {
                                            name: "password",
                                            type: "password",
                                            onChange: this.onChange,
                                            value: a,
                                            placeholder: "New Password"
                                          })
                                        )
                                      ),
                                      r.a.createElement(
                                        L.Field,
                                        null,
                                        r.a.createElement(
                                          L.Control,
                                          null,
                                          r.a.createElement(
                                            S.a,
                                            { className: "is-fullwidth" },
                                            "Submit"
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          );
                    }
                  }
                ]),
                t
              );
            })(n.Component)
          }
        ],
        Xe = Object(h.a)(y)
          .concat(
            Object(h.a)(ve),
            Object(h.a)(Re),
            Object(h.a)(De),
            Object(h.a)(Be),
            Object(h.a)(Ve),
            Object(h.a)(Ke),
            Object(h.a)(Qe)
          )
          .concat(Te),
        Ye = r.a.createContext(),
        Ze = (Ye.Consumer,
        (function(e) {
          function t() {
            var e, a;
            Object(c.a)(this, t);
            for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
              r[o] = arguments[o];
            return (
              ((a = Object(s.a)(
                this,
                (e = Object(m.a)(t)).call.apply(e, [this].concat(r))
              )).state = {
                notify: function(e) {
                  return Object(d.toast)(e);
                }
              }),
              a
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    Ye.Provider,
                    { value: this.state },
                    this.props.children
                  );
                }
              }
            ]),
            t
          );
        })(n.Component)),
        $e = (function(e) {
          function t() {
            return (
              Object(c.a)(this, t),
              Object(s.a)(this, Object(m.a)(t).apply(this, arguments))
            );
          }
          return (
            Object(u.a)(t, e),
            Object(i.a)(t, [
              {
                key: "render",
                value: function() {
                  return r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(
                      Ze,
                      null,
                      r.a.createElement(p.a, null, Object(b.a)(Xe)),
                      r.a.createElement(d.ToastContainer, null)
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component);
      l.a.render(r.a.createElement($e, null), document.getElementById("root"));
    },
    4: function(e, t, a) {
      var n = a(133),
        r = a(164),
        o = a(165),
        l = a(166),
        c = a(167);
      e.exports = { socket: n, Auth: r, Game: o, GameLobby: l, MainLobby: c };
    },
    42: function(e, t) {
      e.exports = function(e, t) {
        var a =
          arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : "post";
        return fetch(
          (function(e) {
            return "/api".concat(e);
          })(e),
          (function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = {
                method: arguments.length > 1 ? arguments[1] : void 0,
                credentials: "include",
                headers: { "Content-Type": "application/json" }
              };
            return Object.keys(e).length > 0 && (t.body = JSON.stringify(e)), t;
          })(t, a)
        );
      };
    },
    73: function(e, t) {
      e.exports = function(e) {
        return e.ok
          ? e.text().then(function(e) {
              return JSON.parse(e);
            })
          : e;
      };
    },
    74: function(e, t, a) {
      e.exports = a.p + "static/media/header_logo.90b2b56e.png";
    },
    75: function(e, t, a) {
      e.exports = a.p + "static/media/header_logo.90b2b56e.png";
    },
    78: function(e, t, a) {
      e.exports = a(242);
    },
    83: function(e, t, a) {},
    97: function(e, t, a) {}
  },
  [[78, 2, 1]]
]);
//# sourceMappingURL=main.4e6a81a3.chunk.js.map
