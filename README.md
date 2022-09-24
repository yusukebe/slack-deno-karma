# Karma Bot for Slack

An example for "[new Slack platform](https://api.slack.com/future)" with Deno.

## Screenshots

![SS](https://user-images.githubusercontent.com/10682/192105268-ded58e21-3b82-4625-a24c-819ad5c96fc6.png)

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
