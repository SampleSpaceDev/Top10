import React, { useEffect, useState } from "react";
import { SpotifyApi, Track } from "@spotify/web-api-ts-sdk";
import "./Playlist.css";

const api = SpotifyApi.withClientCredentials(
    process.env.REACT_APP_CLIENT_ID as string,
    process.env.REACT_APP_CLIENT_SECRET as string,
    ["user-read-private", "playlist-read-private", "playlist-read-collaborative"]
);

const Playlist = () => {
    const [topTracks, setTopTracks] = useState<Track[]>([]);

    useEffect(() => {
        const fetchTop = async () => {
            console.log(process.env.CLIENT_ID)
            const playlistItems = await api.playlists.getPlaylistItems(process.env.REACT_APP_PLAYLIST_ID as string);
            const tracks: Track[] = [];
            playlistItems.items.forEach((item) => {
                return tracks.push(item.track as Track);
            });
            setTopTracks(tracks);
        }

        fetchTop();
    }, []);

    return (
        <div>
            <h1><a href="https://open.spotify.com/user/31ey7aixeaqeqk3es3ur3er7ibmu">Sam</a>'s Top 10</h1>
            <ul>
                {topTracks.slice(0, 10).map((track: Track, index) => trackDisplay(track, index))}
            </ul>
            <h2>Honourable Mentions</h2>
            {topTracks.slice(10).length === 0 && <p className="no-hm">None</p>}
            <ul>
                {topTracks.slice(10).map((track: Track, index) => trackDisplay(track, index + 11))}
            </ul>
        </div>
    );
}

const trackDisplay = (track: Track, index: number) => {
    return (
        <li key={track.id} className="playlist-item">
            <div className="playlist-item-info">
                <span className="playlist-item-position">{index < 10 ? "#" + (index + 1) : ""}</span>
                <img
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    className="playlist-item-image"
                    onClick={() => window.open("https://open.spotify.com/album/" + track.album.id)}
                />
            </div>
            <div className="playlist-item-details">
                <p className="playlist-item-name">
                    <a href={"https://open.spotify.com/track/" + track.id}>
                        {track.name.length > 40 ? track.name.slice(0, 40) + '...' : track.name}
                    </a>
                </p>
                <p className="playlist-item-artist">{track.artists.map(artist => artist.name).join(", ")}</p>
            </div>
        </li>
    );
}

export default Playlist;
