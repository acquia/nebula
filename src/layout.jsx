import { Region } from 'drupal-canvas';

export default function Layout({ children }) {
  return (
    <>
      <Region name="header" />
      <main>{children}</main>
      <Region name="footer" />
    </>
  );
}
