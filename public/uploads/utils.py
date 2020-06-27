from scipy.io import wavfile as wav
import numpy as np
from librosa import core
from librosa.feature import tempogram
from librosa.util.exceptions import ParameterError
import mir_eval
import os
from prettytable import PrettyTable
import madmom

DEBUG = False
workDir = '/home/nthulab828/Documents/MIR_FINAL/public/uploads/'

def madMom(useMadmom, useDownBeat, f):
    if not useDownBeat:
        proc = madmom.features.beats.BeatTrackingProcessor(fps=100)
        act = madmom.features.beats.RNNBeatProcessor()(f)
        timetag = proc(act)
    if useDownBeat:
        proc = madmom.features.downbeats.DBNDownBeatTrackingProcessor(beats_per_bar=[3, 4], fps=100)
        act = madmom.features.downbeats.RNNDownBeatProcessor()(f)
        timetag = np.array(proc(act))
        timetag = np.delete(timetag, np.s_[1::], 1).flatten()
    return proc, act, timetag


def read_beatfile(DB, f):
    global reference_beats

    if DB == 'Ballroom':
        genre = f.split('/')[2]
        file_name = f.split('/')[3].replace('wav', 'beats')
        beat_file = DB + '/key_beat/' + genre + '/' + file_name
        # print(beat_file)
        reference_beats, _ = mir_eval.io.load_labeled_events(beat_file)
        reference_beats = mir_eval.beat.trim_beats(reference_beats)
    elif DB == 'SMC':
        dirPath = workDir+ r"SMC/SMC_MIREX_Annotations"
        result = [f for f in os.listdir(
            dirPath) if os.path.isfile(os.path.join(dirPath, f))]
        for i in range(len(result)):
            if f.split('SMC/SMC_MIREX_Audio/')[1].split('.wav')[0] in result[i]:
                reference_beats = mir_eval.io.load_events(
                    dirPath + '/' + result[i])
                break
    elif DB == 'JCS':
        dirPath = r"JCS/annotations"
        result = [f for f in os.listdir(
            dirPath) if os.path.isfile(os.path.join(dirPath, f))]
        for i in range(len(result)):
            if f.split('JCS/JCS_audio/')[1].split('.wav')[0] in result[i]:
                # print(result[i])
                reference_beats, _ = mir_eval.io.load_labeled_events(
                    dirPath + '/' + result[i])
                reference_beats = mir_eval.beat.trim_beats(reference_beats)
                break
    return reference_beats


def read_downbeatfile(DB, f):
    global event_times, labels
    if DB == 'JCS':
        dirPath = r"JCS/annotations"
        result = [f for f in os.listdir(
            dirPath) if os.path.isfile(os.path.join(dirPath, f))]
        for i in range(len(result)):
            if f.split('JCS/JCS_audio/')[1].split('.wav')[0] in result[i]:
                event_times, labels = mir_eval.io.load_labeled_events(
                    dirPath + '/' + result[i])
    elif DB == 'Ballroom':
        genre = f.split('/')[2]
        file_name = f.split('/')[3].replace('wav', 'beats')
        beat_file = DB + '/key_beat/' + genre + '/' + file_name
        event_times, labels = mir_eval.io.load_labeled_events(beat_file)
    return event_times, labels


def read_wav(f):
    sr, y = wav.read(f)

    if y.dtype == np.int16:
        y = y / 2 ** (16 - 1)
    elif y.dtype == np.int32:
        y = y / 2 ** (32 - 1)
    elif y.dtype == np.int8:
        y = (y - 2 ** (8 - 1)) / 2 ** (8 - 1)

    if y.ndim == 2:
        y = y.mean(axis=1)
    return (sr, y)

def P_score(t, gt):
    if abs((gt - t) / gt) <= 0.08:
        p = 1.0
    else:
        p = 0.0
    return p


def ALOTC(t_1, t_2, gt):
    if abs((gt - t_1) / gt) <= 0.08 or abs((gt - t_2) / gt) <= 0.08:
        p = 1.0
    else:
        p = 0.0
    return p


