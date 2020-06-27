from glob import glob
import librosa
import mir_eval
import utils
from tqdm import tqdm

DB = 'SMC'
workDir = '/home/nthulab828/Documents/MIR_FINAL/public/uploads/'
if DB == 'SMC':
    FILES = glob(workDir +
                 DB + '/SMC_MIREX_Audio//*.wav')

useMadmom = False
useDownBeat = False


def open_file(fileName, funName):
    f = open(fileName, mode='w')
    var = str(eval(funName))
    f.write(var)
    f.close()

if DB == 'SMC' or DB == 'JCS':
    def run(runs):
        fScore = list()
        sum_f = 0.0
        cnt_f = 0.0
        for f in tqdm(FILES[:runs]):
            f = f.replace('\\', '/')

            # Beat tracking
            if not useDownBeat:
                g_beats = utils.read_beatfile(DB, f)
            elif useDownBeat:
                event_times, labels = utils.read_downbeatfile(DB, f)

            if useMadmom:
                proc, act, timetag = utils.madMom(
                    useMadmom, useDownBeat, f)
            elif not useMadmom:
                sr, y = utils.read_wav(f)
                tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
                timetag = librosa.frames_to_time(beats, sr=sr)

            # F score
            if not useDownBeat:
                f_measure = mir_eval.beat.f_measure(g_beats, timetag, 0.07)
            elif useDownBeat:
                f_measure = mir_eval.beat.f_measure(
                    event_times, timetag, 0.07)

            sum_f += f_measure
            cnt_f += 1.0

        fScore = sum_f/cnt_f

        # print('F-score\t{:.2%}'.format(fScore))
        print('{:.4f}'.format(fScore))

        return [fScore]


if __name__ == '__main__':
# js prefer JSON format so abort below script
    # open_file(workDir+"/data.txt", 'run(4)')
    
   run(4)
