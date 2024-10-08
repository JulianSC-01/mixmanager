# Mix Manager Web Client

## Overview

The Mix Manager Web Client is an editor that creates music tracklists and their tracks. Tracklist data is stored on Firebase and the application is also hosted on Firebase.

The user must login to the application to read or update their tracklists.

The application is written in TypeScript and HTML using the Angular framework. (v12.2.1)

## Supported Features

Secure Login
- E-mail and password required.

Tracklist Editor
- Add, Update or Delete tracklists. (Tracklist attributes include: Title, Tracks)
- Add, Update or Delete tracks within tracklists. (Track attributes include: Artist, Title, BPM and Key.)

## Change Log

2024-09-02 (v1.7.0)
Latest Version
  - Upgraded to Angular 17
  - Upgraded to Firebase 10.13.1
  - Upgraded js-shared library to 1.1.0

2023-06-25 (v1.6)
  - Upgraded to Angular 16

2023-06-11 (v1.5)
  - Upgraded to Angular 15
  - Upgraded to Angular Fire 7.5.0 and Firebase 9.22.2

2022-10-31 (v1.3)
  - Upgraded to Angular 14.2
  - Upgraded to Angular Fire 7.4.1 and Firebase 9.12.1
  - Upgraded to Bootstrap 5.2.2
  - Some updates to the code and the user interface for new dependency versions

2021-08-14 (v1.2)
  - Upgraded to Angular 12.2.1
  - Upgraded to Angular Fire 6.1.5 and Firebase 8.9.1
  - Major accessibility improvements.
  - New header and footer.
  - Login page validation updates; only show 1 generic error on server side login failures.
  - Observables now terminate properly when their component is destroyed; fixes console errors.
  - Small bug fixes and cleanup.

2021-06-01 (v1.1)
  - Added "Swap Tracks" function.
  - Added module preloading for improved navigation.
  - Updated the user interface for certain pages.
  - Updated the standard page footer.
  - Module, component and service refactoring.
  - Small bug fixes.

2021-03-14 (v1.0)
- Initial Version
