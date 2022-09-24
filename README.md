# Karma Bot for Slack

An example for "[new Slack platform](https://api.slack.com/future)" with Deno.

## Usage

Develop:

```shell
slack run
```

Test:

```shell
deno test
```

Deploy

```shell
slack deploy
```

Add a trigger:

```shell
slack trigger create --trigger-def ./src/triggers/mention.ts
```

## Author

Yusuke Wada <https://github.com/yusukebe>

## License

MIT
