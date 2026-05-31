import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LRCPlayer } from "../packages/Player";
import { createLrcObj } from "../packages/util";

const mockLrc = createLrcObj(`[00:00]First line
[00:05]Second line
[00:10]Third line`);

describe("LRCPlayer", () => {
  beforeEach(() => {
    cleanup();
  });

  it("renders with basic props", () => {
    render(
      <LRCPlayer
        src="test.mp3"
        cover="cover.jpg"
        title="Test Song"
        lrc={mockLrc}
      />
    );

    expect(screen.getByText("Test Song")).toBeInTheDocument();
  });

  it("renders cover image", () => {
    render(
      <LRCPlayer
        src="test.mp3"
        cover="cover.jpg"
        lrc={mockLrc}
      />
    );

    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute("src")).toBe("cover.jpg");
    expect(img?.getAttribute("width")).toBe("80");
  });

  it("renders audio element with correct src", () => {
    render(
      <LRCPlayer
        src="test.mp3"
        cover="cover.jpg"
        lrc={mockLrc}
      />
    );

    const audio = document.querySelector("audio");
    expect(audio).toBeInTheDocument();
    expect(audio?.getAttribute("src")).toBe("test.mp3");
    expect(audio?.getAttribute("controls")).toBe("");
  });

  it("displays placeholder when lyric is empty", () => {
    render(
      <LRCPlayer
        src="test.mp3"
        cover="cover.jpg"
        lrc={[{ t: 0, c: "" }]}
        placeholder="No lyrics"
      />
    );

    expect(screen.getByText("No lyrics")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(
      <LRCPlayer
        src="test.mp3"
        cover="cover.jpg"
        title="Test Song"
        subTitle="Test Artist"
        lrc={mockLrc}
      />
    );

    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("handles empty lrc array", () => {
    render(
      <LRCPlayer
        src="test.mp3"
        cover="cover.jpg"
        lrc={[]}
        placeholder="No lyrics available"
      />
    );

    // When lrc is empty, current stays as initial empty ReactNode
    // The component renders but there's no lyric to display
    const audio = document.querySelector("audio");
    expect(audio).toBeInTheDocument();
  });
});
