# GitNotes

[GitNotes current deployment v0.0.1](https://gitnotes.netlify.com/)

## About

GitNotes is a git backed, version controlled notes taking application. The application will use
API's of some of the largest git hosting sites to interact with your own repository. For a [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product),
we will focus on [GitLab's APIs](https://docs.gitlab.com/ee/api/), but will expand to GitHub and BitBucket in the future.
We plan to use Oauth2 authentication from these providers, which means we will not store any user data or have a need for a backend.
Files will be stored as `.md` files in the users git repository, then rendered as html on the client side.

![GitNotes diagram](https://i.imgur.com/lbBBydy.png)

## Getting Started

To build and run the dev environment

```bash
npm install
npm run start
```

To run the tests

```bash
npm test
```

## Making contributions

We openly welcome any and all contributions. If you have comments, questions or ideas, please don't hesitate.
We would love to hear from you. Check out our [Contributing guide](./docs/CONTRIBUTING.md) for tips on how to
get started. A great place to get in touch with us is our
[Slack Channel](https://join.slack.com/t/skillcamp-io/shared_invite/enQtMzgxMjM5NjU1OTU4LTIzNDIzZTA3YTY0ZTY1NWVmMDUxZDllZjVmZjNiZDRiZTdhN2RhZjhhZTI5MGQxNzY1ZDlhNTAxYTlmNWRkYzA).
If you want to see what we have planned or what you can do to contribute, check out the
[project's issue board](https://gitlab.com/skillcamp/gitnotes/issues/).

## Built With

- [React.js](https://reactjs.org/) - Web Framework
- [Redux](https://redux.js.org/) - Application State Management
- [Styled Components](https://www.styled-components.com/) - Styling

## Authors

A special thank you to everyone has who participated in this project!
See the full list of [contributors](https://gitlab.com/skillcamp/gitnotes/graphs/master).

## License

This project is licensed under the GPLv2 License - see the [LICENSE.md](LICENSE.md) file for details
