drop ALIAS if exists TO_DATE;
CREATE ALIAS TO_DATE as '
import java.text.*;
@CODE
java.util.Date toDate(String originalDate, String dateFormat) throws Exception {
    return new SimpleDateFormat(dateFormat).parse(originalDate);
}
';