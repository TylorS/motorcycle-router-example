import { run } from '@motorcycle/core';
import { DomSource, VNode, makeDomDriver, div, h2, a } from '@motorcycle/dom';
import { RouterSource, RouterInput, routerDriver, Router } from '@motorcycle/router';
import { captureClicks } from '@motorcycle/history';
import { Stream, just } from 'most';

interface MainSources {
  dom: DomSource;
  router: RouterSource;
}

interface MainSinks {
  dom: Stream<VNode>;
  router: RouterInput;
}

function main(sources: MainSources) {
  const page$ = Router({
    '/': HomeComponent,
    '/other': OtherComponent,
  }, sources);

  const router = sources.dom.select('a').events('click')
    .tap(ev => ev.preventDefault())
    .map(ev => (ev.target as HTMLAnchorElement).pathname);

  return {
    dom: page$.map(p => p.dom).switch(),
    router,
  };
}

function HomeComponent() {
  return {
    dom: just(
      div({}, [
        h2('Home'),
        a({ props: { href: '/other' } }, 'Link to Other'),
      ]),
    ),
  };
}

function OtherComponent() {
  return {
    dom: just(
      div({}, [
        h2('Other'),
        a({ props: { href: '/' } }, 'Link to Home'),
      ]),
    ),
  };
}

run<MainSources, MainSinks>(main, {
  dom: makeDomDriver(document.querySelector('#app') as HTMLElement),
  router: routerDriver,
});
