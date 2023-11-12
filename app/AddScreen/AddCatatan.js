import { Box, TextArea,Text,Stack,View} from 'native-base'
import { PrimaryButton,Separator } from '../../components'



const noted = () => {
    return (
    <View> 
        <Box alignItems="center" w="100%">
            <Stack space={2.5} w="80%" >
            <Box>
                <View>
                    <Text bold fontSize="lg" mb="4">Catatan Tugas</Text>
                </View>
                <TextArea aria-label="t1Disabled" placeholder="Catatan" h={400} borderColor="black" borderRadius={5} borderStyle="solid"/>
            </Box>
            </Stack>
        </Box>
        <Separator height={100}/>
        <View p={10}>
          <PrimaryButton title="Simpan dan Lanjutkan" color="#2196F3"/>
        </View>

    </View>
    );
  };

export default noted;